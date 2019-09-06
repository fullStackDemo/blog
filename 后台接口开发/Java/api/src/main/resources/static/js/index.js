//upload
var uploadBtn = document.querySelector('.el-upload');

uploadBtn.onchange = function (e) {
    var file = this.files[0];
    console.log(this.files);

    var xhr = new XMLHttpRequest();
    xhr.open("post", "/upload", true);
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(this.responseText)
        }
    };
    var formData = new FormData();
    formData.append("file", file);
    xhr.send(formData);
};