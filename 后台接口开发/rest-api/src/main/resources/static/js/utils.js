window.utils = {

	// md5
	generateMd5(userName, password) {
		const salt = "1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik9ol0p@!.";
		const asciStr = userName + salt + password;
		const asciArr = asciStr.split('');
		const asciResult = [];
		asciArr.forEach(n => {
			asciResult.push(n.charCodeAt());
		});
		const ascireusltStr = asciResult.join(salt);
		const newPassword = hex_md5(ascireusltStr);
		return newPassword;
	},

	// setCookie
	setCookie(name, value) {
		var time = 2 * 60 * 60 * 1000;
		var exp = new Date();
		exp.setTime(exp.getTime() + time);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	},

	// getCookie
	getCookie(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	}


};