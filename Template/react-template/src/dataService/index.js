const apiPrefix = '/api/';
const service = {};

// GET 
const get = (url, params) => {

    if (!params) {
        params = {};
    }

    let searchStr = '';
    const searchArr = [];

    Object.keys(params).forEach(n => {
        if (n) {
            searchArr.push(n + "=" + params[n]);
        }
    });
    if (searchArr.length) {
        searchStr += "?" + searchArr.join(';');
    }

    return fetch(apiPrefix + url + searchStr,
        {
            method: "GET",
        }
    ).then(res => res.json());
}

// POSt
const post = (url, params) => {

    if (!params) {
        params = {}
    }

    const formData = new FormData();
    Object.keys(params).forEach(n => {
        formData.append(n, params[n]);
    });

    return fetch(apiPrefix + url,
        {
            method: "POST",
            body: formData
        }
    ).then(res => res.json());
};


// 获取验证码
service.getCaptcha = params => {
    return get('v1/user/captcha', params);
};

// 提交网址
service.addBookmark = params => {
    return post('v1/bookmark/add', params);
};

export default service;


