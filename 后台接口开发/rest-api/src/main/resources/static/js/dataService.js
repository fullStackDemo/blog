const APIURL = '/';
window.dataService = {


	//GET
	get: (url, params = {}) => {

		const searchArr = [];

		Object.keys(params).forEach(n => {
			searchArr.push(`${n}=${params[n]}`);
		});
		const searchStr = searchArr.length ? '?' + searchArr.join('&') : '';

		return fetch(APIURL + url + searchStr, {
			method: 'GET',
			headers: {}
		}).then(res => res.json());
	},

	//POST
	post: (url, params = {}) => {

		const formData = new FormData();

		Object.keys(params).forEach(n => {
			formData.append(n, params[n]);
		});

		return fetch(APIURL + url, {
			method: 'POST',
			headers: {},
			body: formData
		}).then(res => res.json());
	},

	// 注册
	addUser(params) {
		return this.post('user/add', params);
	},

};