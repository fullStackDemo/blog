
const xhr = new XMLHttpRequest();

xhr.open('GET', location.origin + '/sign?url=' + location.href, true);

xhr.send();

xhr.onload = () => {
  if (xhr.readyState === xhr.DONE) {
    if (xhr.status === 200) {
      const result = JSON.parse(xhr.response);
      console.log(result);
      getWeShare(result)
    }
  }
}

const getWeShare = (params) => {
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wx2d849bddb7e1d889', // 必填，公众号的唯一标识
    timestamp: params.timestamp, // 必填，生成签名的时间戳
    nonceStr: params.nonceStr, // 必填，生成签名的随机串
    signature: params.signature,// 必填，签名
    jsApiList: ["updateTimelineShareData"] // 必填，需要使用的JS接口列表
  });

  wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
    wx.updateAppMessageShareData({
        title: '1', // 分享标题
        desc: '2', // 分享描述
        link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        success: function () {
          // 设置成功
        }
    })
});
}
