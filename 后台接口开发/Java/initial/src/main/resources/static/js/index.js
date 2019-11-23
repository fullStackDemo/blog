//upload
var uploadBtn = document.querySelector('.el-upload');

uploadBtn.onchange = function (e) {
    let files = this.files;
    console.log(this.files);

    const xhr = new XMLHttpRequest();
    xhr.open("post", "/upload", true);
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(JSON.parse(this.responseText));
            const {data} = JSON.parse(this.responseText);
            if(!data) return;
            const imageList = data.slice(0);
            let imageStr = '';
            imageList.forEach(img=>{
                imageStr += `<img src="${img}" />`;
            });
            document.getElementById("result").innerHTML = imageStr;
        }
    };

    const formData = new FormData();

    // 多个file 同时上传
    if(files && files.length){
        for (let i=0;i<files.length;i++) {
            formData.append("file", files[i])
        }
    }

    console.log(formData);

    xhr.send(formData);
};