//获取相关用户信息
const userNameInput = document.getElementById("js_input——user");
const passwordInput = document.getElementById("js_input——pwd");
const passwordConfirmInput = document.getElementById("js_input——pwd2");
const submitBtn = document.getElementById("submit");

//submit
submitBtn.onclick = () => {
	const userName = userNameInput.value;
	const password = passwordInput.value;
	const confirmPassword = passwordConfirmInput.value;

	//verify
	if (!userName) {
		weui.topTips('用户姓名不能为空');
		return;
	} else if (!password) {
		weui.topTips('用户密码不能为空');
		return;
	} else if (confirmPassword != password) {
		weui.topTips('前后密码不一致，请重试');
		return;
	}

	//注册
	dataService.addUser({
		userName,
		password,
	}).then(res => {

	})
};