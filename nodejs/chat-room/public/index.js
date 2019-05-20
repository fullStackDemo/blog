var socket = io();

//Initialize variables
var submitBtn = document.getElementById('submitBtn');
var typeInput = document.getElementById('typeInput');
var photoInput = document.querySelector('.photoInput');
var profileBox = document.querySelector('.profileBox');
var photoImage = document.querySelector('.photoImage');
var messages = document.getElementById('messages');

var chatPage = document.querySelector('.chatPage');
var loginPage = document.querySelector('.loginPage');
var usernameInput = document.getElementsByClassName('usernameInput')[0];
var chatHeader = document.querySelector('.charHeader');
var chartTitle = 'ChatRoom 1.0';

usernameInput.focus();
usernameInput.value = '';

//Prompt for setting a username
var connected = false;
var username;
var typing = false;
var lastSendTime; //last time of sending the message
var lastTypingTime; //last time of typing the message
var TYPING_TIMER_LENGTH = 500;
var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
];


var photoUrl = '';

//observe files input
photoInput.onchange = () => {
    const fileReader = new FileReader();
    const files = photoInput.files;

    if (files && files.length) {
        for (let i = 0, l = files.length; i < l; i++) {
            if (!files[i].type.includes('image')) {
                popup.show({
                    width: 300,
                    height: 100,
                    content: 'please upload image, not others files',
                    timer: 2000
                });
                return;
            }
            fileReader.readAsDataURL(files[i]);
        }
    }
    fileReader.onload = e => {
        photoUrl = e.target.result;
        photoImage.src = photoUrl;
        photoImage.style.display = 'block';
    };
};


//获取当前time
const getNowTime = () => {
    return new Date().format('hh:mm');
};

//log
const log = (msg, obj) => {
    if (!obj) obj = {};
    const li = document.createElement('li');
    li.innerHTML = msg;
    if (obj.log) {
        li.classList.add('log');
    } else if (obj.time) {
        li.classList.add('textCenter');
    } else {
        li.classList.add('chat');
        if (obj.align == 'right') {
            li.classList.add('mySelf')
        }
    }
    messages.appendChild(li);
    console.log(chatPage.scrollHeight, chatPage.clientHeight, chatPage.offsetHeight);

    chatPage.scrollTop = chatPage.scrollHeight;
};

//added participants number message
const addParticipantsMessage = data => {
    let message = '';
    if (data.numUsers == 1) {
        message += "There's 1 participant."
    } else {
        message += "There are " + data.numUsers + ' participants.';
    }
    log(message, {
        log: true
    });
};

//sendMessage
const sendMessage = (message, isSelf) => {
    console.log('msg', message, connected);
    if (connected && message) {
        typeInput.value = '';
        //log into current client chat 
        addChatMessage({
            username: username,
            message: message,
            align: isSelf ? 'right' : '',
            time: getNowTime(),
            photoUrl
        });
        //log into other client char body
        socket.emit('new message', {
            message: message,
            time: getNowTime(),
            photoUrl
        });
    }
}

//get the color of the user
const getUsernameColor = username => {
    if (!username) return;
    //compute hash code
    let hash = 7;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    //Calculate the color
    const index = Math.abs(hash % COLORS.length);
    return COLORS[index];
};

//set the client's username
const setUsername = () => {
    username = usernameInput.value.trim();
    if (username && photoUrl) {
        //login
        loginPage.style.display = 'none';
        chatPage.style.display = 'block';
        socket.emit('add user', {
            username: usernameInput.value,
            photoUrl
        });
        typeInput.focus();
        usernameInput.value = '';
    } else {
        popup.show({
            width: 300,
            height: 100,
            content: 'please upload your photo or type in your name !',
            timer: 2000
        });
    }
};

//addChatMessage
const addChatMessage = data => {
    if (data.username && data.message) {
        //show time of send message
        if (data.time && lastSendTime != data.time) {
            lastSendTime = data.time;
            log(generateHtml(data, 'time'), {
                time: true,
            });
        }
        if (data.align == 'right') {
            log(generateHtml(data, 'ownSend'), {
                align: 'right'
            });
        } else {
            log(generateHtml(data, 'otherSend'), {
                align: ''
            });
        }
    }
};

//generate html

const generateHtml = (data, type) => {
    const bg = data.photoUrl ? "style='background-image:url(" + data.photoUrl + ")'" : 'style="background-color:' + getUsernameColor(data.username) + '"';
    const nameColor = 'style="color:' + getUsernameColor(data.username) + '"';
    let _html = '';
    //时间提示
    if (type == 'time') {
        _html = '<span class="chatTime">' + data.time || '--' + '</span>';
    } else if (type == 'ownSend') { //自己发送
        // _html = '<span class="chatText">' + data.message + '</span>' +
        //     '  ' +
        //     '<span class="chatUsername"  ' + bg + '>' + data.username + '</span>';
        _html = `
            <div class="chatItem">
                <div class="chatItemRight">
                    <div class="chatItemRight_bottom">${data.username}</div>
                </div>
                <div class="chatItemLeft">
                    <span class="chatUsername" ${bg}></span>
                </div>
            </div>
        `;
    } else if (type == 'otherSend') { //别人发送
        // _html = '<span class="chatUsername" ' + bg + '}>' + data.username + '</span>' +
        //     '  ' +
        //     '<span class="chatText">' + data.message + '</span>';
        _html = `
            <div class="chatItem">
                <div class="chatItemLeft">
                    <span class="chatUsername" ${bg}></span>
                </div>
                <div class="chatItemRight">
                    <div class="chatItemRight_top" ${nameColor}>${data.username}</div>
                    <div class="chatItemRight_bottom">${data.username}</div>
                </div>
            </div>
        `;
    } else if (type == 'join' || type == 'left') { //用户进入 或者 离开
        _html = '<b style="color: ' + getUsernameColor(data.username) + '">' + data.username + '</b> ' + type;
    }
    return _html;
};

//keyboard event

window.onkeydown = e => {
    //auto-focus the current input when a key is typed
    if (!(e.ctrlKey || e.altKey || e.metaKey)) {
        usernameInput.focus();
        typeInput.focus();
    }
    if (e.keyCode == 13) {
        //进入聊天
        if (username && photoUrl && chatPage.style.display != 'none') {
            //chat room
            sendMessage(typeInput.value.trim(), 'mySelf');
            socket.emit('stop typing');
            typing = false;
        } else {
            //登录页面
            setUsername();
        }
    }

};

//click the submit
submitBtn.addEventListener('click', e => {
    e.preventDefault();
    sendMessage(typeInput.value.trim(), 'mySelf');
}, false);

//listen the typing of the input
typeInput.oninput = () => {
    updateTypingMessage();
};

//someone's typing tip
const updateTypingMessage = () => {
    if (connected) {
        if (!typing) {
            typing = true;
            socket.emit('typing');
        }
        lastTypingTime = new Date().getTime();

        setTimeout(() => {
            var now_time = new Date().getTime();
            var time_diff = now_time - lastTypingTime;
            if (time_diff > TYPING_TIMER_LENGTH && typing) {
                socket.emit('stop typing');
                typing = false;
            }
        }, TYPING_TIMER_LENGTH);
    }
}

//store the user data to localStorage
const recordUserData = data => {
    let userData = JSON.parse(localStorage.getItem('chatUser')) || [];
    console.log(userData, data.username);
    let obj = {
        username: data.username,
        userId: data.userId
    };
    if (_.findIndex(userData, o => {
            return o.username = data.username;
        }) > -1) {
        console.log('already joined');
    } else {
        userData = _.concat(userData, obj);
    }
    localStorage.setItem('chatUser', JSON.stringify(userData));
};

//socket events

//whether the server emits "login", log it in chart body
socket.on('login', data => {
    connected = true;
    var message = 'welcome to socket.io chat room ';
    if (!data.username) return;
    log(message, {
        log: true, // prompt
    });
    recordUserData(data);
    addParticipantsMessage(data);
});

//whether the server emits "new message", log it in chart body
socket.on('new message', data => {
    addChatMessage(data);
});

//whether the server emits "user joined", log it in chart body
socket.on('user joined', data => {
    log(generateHtml(data, 'join'), {
        log: true, // prompt
    });
    addParticipantsMessage(data);
});

//whether the server emits "user left", log it in chart body
socket.on('user left', data => {
    log(generateHtml(data, 'left'), {
        log: true, // prompt
    });
    const userData = JSON.parse(localStorage.getItem('chatUser')) || [];
    const left_index = _.findIndex(userData, o => {
        return o.username = data.username
    });
    userData.splice(left_index, 1);
    localStorage.setItem('chatUser', JSON.stringify(userData));
    addParticipantsMessage(data);
});

//the server emits "typing"
socket.on('typing', data => {
    const name = data.username;
    if (name) chatHeader.textContent = name + ' is typing...';
});

socket.on('stop typing', () => {
    chatHeader.textContent = chartTitle;
});


socket.on('reconnect', () => {
    log('you have been reconnected', {
        log: true
    });
    if (username) {
        socket.emit('add user', username);
    }
});

socket.on('disconnect', () => {
    log('you have been disconnected', {
        log: true
    });
});

socket.on('reconnect_error', () => {
    log('attempt to reconnect has failed', {
        log: true
    });
});