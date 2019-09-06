const timeout = 10000;
let apiPrefix = '/api/';
const exportsObj = {};
// 是否本地运行
const isDev = location.host.includes('localhost');

//获取token
let getToken = function () {
    const reg = new RegExp('(^| )token=([^;]*)(;|$)');
    const arr = document.cookie.match(reg);
    if (arr && arr.length > 0) {
        return decodeURIComponent(arr[2]);
    } else {
        return null;
    }
};

//获取cookie
let getCookie = function (name) {
    var arr,
        reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if ((arr = document.cookie.match(reg))) {
        return decodeURIComponent(arr[2]);
    } else {
        return null;
    }
};

// 设置 cookie
let setCookie = function (name, value) {
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/';
};

// 清除 cookie
let delCookie = name => {
    let date = new Date();
    date.setTime(date.getTime() - 100);
    let cval = name;
    if (cval != null) document.cookie = name + '=' + cval + ';expires=' + date.toGMTString() + ';path=/';
};

//get
let get = function (api, params) {
    // console.log(api, params);

    if (!params._this) {
        console.log('请添加 `_this` 参数');
        return;
    }
    if (!params.options) {
        params.options = {};
    }

    // 传入 cookie
    // if (!isDev) {
    //     params.options.JSESSIONORIGIN = '1qaz2wsx3edc';
    // }

    return params._this.$http
        .get(apiPrefix + api, {
            params: params.options,
            timeout: timeout
        })
        .then(
            function (res) {
                // console.log('数据返回', res);
                var handle = handleDataResponse(params);
                if (!res || !res.body) {
                    handle.callback1001(res);
                } else {
                    // 外部接口，并没有
                    let res_code = '';
                    if (res.body.hasOwnProperty('code')) {
                        res_code = res.body.code;
                    } else {
                        res_code = res.body.errorCode;
                    }
                    switch (res_code) {
                        case 0:
                            handle.callback0(res);
                            break;
                        case 1001:
                            handle.callback1001(res);
                            break;
                        case 1009:
                            handle.callback1009(res);
                            break;
                        case 1100:
                            handle.callback1100(res);
                            break;
                        case 405:
                            handle.callback405(res);
                            break;
                        default:
                            break;
                    }
                }
                handle.afterResponse(res);
            },
            function (res) {
                // console.log('res: ', res)
                if (params.fail) {
                    params.fail(res);
                    // console.log('fail')
                }
            }
        );
};
//post
let post = function (api, params) {
    if (!params._this) {
        console.log('请添加 `_this` 参数');
        return;
    }
    if (!params.options) {
        params.options = {};
    }

    // if (!isDev) {
    //     params.options.JSESSIONORIGIN = '1qaz2wsx3edc';
    // }

    var formData = new FormData();
    for (var key in params.options) {
        if (params.options[key] !== '' && params.options[key] !== undefined) {
            formData.append(key, params.options[key]);
        }
    }
    return params._this.$http
        .post(apiPrefix + api, formData, {
            timeout: timeout
        })
        .then(
            function (res) {
                // console.log('数据返回', res);

                var handle = handleDataResponse(params);
                switch (res.body.code) {
                    case 0:
                        handle.callback0(res);
                        break;
                    case 1001:
                        handle.callback1001(res);
                        break;
                    case 1009:
                        handle.callback1009(res);
                        break;
                    default:
                        break;
                }
                handle.afterResponse(res);
            },
            function (res) {
                // console.log('res: ', res)
                if (params.fail) {
                    params.fail(res);
                }
            }
        );
};
//处理数据
let handleDataResponse = function (callback) {
    let callback0 = callback.callback0,
        callback400 = callback.callback400,
        callback401 = callback.callback401,
        callback405 = callback.callback405,
        callback1001 = callback.callback1001,
        callback1009 = callback.callback1009,
        callback1100 = callback.callback1100,
        callback1101 = callback.callback1101,
        callbackUnknownError = callback.callbackUnknownError,
        afterResponse = callback.afterResponse;
    if (!callback0) {
        callback0 = function () { };
    }
    if (!afterResponse) {
        afterResponse = function () { };
    }
    if (!callback400) {
        callback400 = function () { };
    }
    if (!callback401) {
        callback401 = function () { };
    }
    if (!callback1001) {
        callback1001 = function () { };
    }
    if (!callback1009) {
        callback1009 = function () {
            // alert('您的电脑系统时间不正确,请修改！');
        };
    }
    if (!callback1100) {
        callback1100 = function () {
            // location.href = location.protocol + '//' + location.host;
        };
    }
    if (!callback405) {
        callback405 = function () {
            console.log('非法请求');
            callback1100();
        };
    }
    if (!callback1101) {
        callback1101 = function () { };
    }
    if (!callbackUnknownError) {
        callbackUnknownError = function () { };
    }
    return {
        callback0: callback0,
        callback400: callback400,
        callback405: callback405,
        callback401: callback401,
        callback1001: callback1001,
        callback1009: callback1009,
        callback1100: callback1100,
        callback1101: callback1101,
        afterResponse: afterResponse
    };
};

/**
 * 格式化日期
 * @param format
 * @returns {*}
 */
Date.prototype.format = function (format) {
    var o = {
        'M+': this.getMonth() + 1, //month
        'd+': this.getDate(), //day
        'h+': this.getHours(), //hour
        'm+': this.getMinutes(), //minute
        's+': this.getSeconds(), //second
        'q+': Math.floor((this.getMonth() + 3) / 3), //quarter
        S: this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return format;
};

exportsObj.getToken = getToken;
exportsObj.setCookie = setCookie;
exportsObj.getCookie = getCookie;
exportsObj.delCookie = delCookie;
exportsObj.get = get;
exportsObj.post = post;

// setCookie('JSESSIONORIGIN', '1qaz2wsx3edc');
// if (isDev) {
//     setCookie('JSESSIONID', 'cf89d035-51dd-4633-b17e-ea91da7e2e30');
// }

// 多个代理地址
const multiApiPrefix = {
    // 本人
    api: '/api/',
    // uc 服务器
    uc: '/uc/',
    // 通讯录接口
    contact: '/contact/',
};

// 登录
exportsObj.login = params => {
    apiPrefix = multiApiPrefix['api'];
    return get('v1/user/login', params);
};


export default exportsObj;
