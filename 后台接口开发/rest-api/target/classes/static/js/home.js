// 获取相关用户信息

const titleDom = document.querySelector(".weui-form__title");

// getUserInfo
function getUserInfo() {
	dataService.getUserInfo({
		// token: utils.getCookie('token')
	}).then(res => {
		const {data} = res;
		if (data) {
			titleDom.innerHTML = 'Hello ' + data.userName + ', 欢迎登录追梦空间';
		}

	})
}

getUserInfo();