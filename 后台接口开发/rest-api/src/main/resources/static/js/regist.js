// 获取相关用户信息
const userNameInput = document.getElementById("js_input——user");
const passwordInput = document.getElementById("js_input——pwd");
const passwordConfirmInput = document.getElementById("js_input——pwd2");
const submitBtn = document.getElementById("submit");

// submit
submitBtn.onclick = () => {

	const userName = userNameInput.value;
	const password = passwordInput.value;
	const confirmPassword = passwordConfirmInput.value;

	// verify
	if (!userName) {
		weui.topTips('用户姓名不能为空');
		return;
	} else if (!password) {
		weui.topTips('用户密码不能为空');
		return;
	} else if (confirmPassword !== password) {
		weui.topTips('前后密码不一致，请重试');
		return;
	}

	// 加密密码
	// const salt = "1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik9ol0p@!.";
	// const asciStr = userName + salt + password;
	// const asciArr = asciStr.split('');
	// const asciResult = [];
	// asciArr.forEach(n => {
	// 	asciResult.push(n.charCodeAt());
	// });
	// const ascireusltStr = asciResult.join(salt);
	// const newPassword = hex_md5(ascireusltStr);
	const newPassword = utils.generateMd5(userName, password);

	// 注册
	dataService.addUser({
		userName,
		password: newPassword,
	}).then(res => {
		const {code, data, msg} = res;
		if (!data) {
			weui.topTips(msg);
		} else {
			weui.topTips(`注册成功，欢迎 ${data.userName}`);
			window.location.href = location.origin + '/login.html';
		}
	})
};