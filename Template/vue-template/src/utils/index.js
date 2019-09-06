/***
 * 公共方法库
 */

// 判断是否是 IE
export const isIE = () => {
    const oldIE = !!window.ActiveXObject || 'ActiveXObject' in window;
    const edge = navigator.userAgent.includes('Edge');
    return oldIE || edge ? true : false;
};

// 解决 IE下 钉钉头像地址 TLS 问题
export const formatDingAvatar = url => {
    if (isIE()) {
        // 跳过两个文件层级
        return '../../' + url.match(/media.*/g)[0];
    } else {
        return url;
    }
};

/*
 * 格式化数据
 * 兼容 ie chrome safari
 * 在IE safari中 需要把 2019-07-10 变成 2019/07/10
 **/
export const formatDate = (date = new Date(), formatType = 'yyyy-MM-dd') => {
    const dateType = Object.prototype.toString.call(date);
    // console.log(888, date, dateType);
    if (!date) return;
    if (dateType == "[object Date]") {
        date = date.format('yyyy-MM-dd hh:mm:ss');
    } else if (dateType != '[object String]') {
        return;
    }
    const _date = date.replace(/-/g, '/');
    return new Date(_date).format(formatType);
}

// 获取 URL search
export const getSearch = key => {
    const search = location.search;
    if (!search) return null;
    const search_data = search.substr(1).split('&');
    const obj = {};
    if (search_data) {
        search_data.forEach(n => {
            const _data = n.split('=');
            obj[_data[0]] = _data[1];
        });
    }
    return obj[key];
}
