const express = require('express');
const app = express();
const http = require('http').createServer(app);
const open = require('open');
const io = require('socket.io')(http);
const path = require('path');
const port = process.env.npm_package_config_port;

console.log('chat port is ' + port);

// Router
app.use(express.static(path.join(__dirname, 'public')));

//chatRoom
var numUsers = 0;
io.on('connection', socket => {
    var addedUser = false;
    console.log('a user connected', socket.id);

    //when the client emits 'new message', the listens and executes
    socket.on('new message', data => {
        console.log('new message');
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data.message,
            time: data.time,
            photoUrl: data.photoUrl
        });
    });

    //when the client emits "add user", the listens and executes
    socket.on('add user', data => {
        if (addedUser) return;

        //we store the username in the socket session for this client
        socket.username = data.username;
        socket.photoUrl = data.photoUrl;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers,
            userId: socket.id,
            username: data.username,
            photoUrl: data.photoUrl
        });
        //echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    //when the client emits "typing", we broadcast it to others
    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    //when the client emits "stop typing", we broadcast it to others
    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    //when the user disconnect, perform this
    socket.on('disconnect', () => {
        if (addedUser) {
            --numUsers;
        }

        //echo globally that this client has left
        socket.broadcast.emit('user left', {
            username: socket.username,
            numUsers: numUsers
        });
    });

});

http.listen(port, () => {
    // open('http://localhost:' + port, 'chrome');
    console.log('listening on %d', port);
});