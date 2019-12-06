const APIURL = '/';

window.dataService = {

	//GET
	get: (url, params = {}) => {

		const searchArr = [];

		Object.keys(params).forEach(n => {
			searchArr.push(`${n}=${params[n]}`);
		});

		const searchStr = searchArr.length ? '?' + searchArr.join('&') : '';
		const token = utils.getCookie('token');

		return fetch(APIURL + url + searchStr, {
			method: 'GET',
			headers: {
				token
			}
		}).then(res => res.json());
	},

	//POST
	post: (url, params = {}) => {

		const formData = new FormData();

		Object.keys(params).forEach(n => {
			formData.append(n, params[n]);
		});

		const token = utils.getCookie('token');

		return fetch(APIURL + url, {
			method: 'POST',
			headers: {
				token
			},
			body: formData
		}).then(res => res.json());
	},

	// 注册
	addUser(params) {
		return this.post('user/add', params);
	},

	// 登录
	login(params) {
		return this.post('user/login', params);
	},

	// 用户信息
	getUserInfo(params) {
		return this.get('user/info', params);
	},

};