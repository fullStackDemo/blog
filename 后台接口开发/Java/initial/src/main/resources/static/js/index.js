const uploadBtn = document.querySelector('.el-upload');

uploadBtn.onchange = function (e) {
	var files = e.target.files;
	console.log(files);
};