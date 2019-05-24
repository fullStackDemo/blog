// promise
const getSignPromise = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', location.origin + '/sign?url=' + location.href, true);
  xhr.send();
  xhr.onload = () => {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        const result = JSON.parse(xhr.response);
        console.log(result);
        resolve(result);
      }
    }
  }
});

// 分享
getSignPromise.then(res => {
  getWeShare(res);
});

/***
 * 微信分享
 */
const getWeShare = (params) => {
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: params.appId, // 必填，公众号的唯一标识
    timestamp: params.timestamp, // 必填，生成签名的时间戳
    nonceStr: params.nonceStr, // 必填，生成签名的随机串
    signature: params.signature, // 必填，签名
    jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'hideMenuItems',
      'chooseImage',
      'updateAppMessageShareData',
      'scanQRCode'
    ] // 必填，需要使用的JS接口列表
  });

  wx.ready(function () { //需在用户可能点击分享按钮前就先调用
    const data = {
      title: '测试JSSDK', // 分享标题
      desc: '后端端口签名测试', // 分享描述
      link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'http://www.wangjinxuanyu.cf/img/share.JPG', // 分享图标
      success: function () {
        // 设置成功
      }
    }
    wx.onMenuShareTimeline(data);
    wx.onMenuShareAppMessage(data);
  });
}

// 打开相册
document.getElementById('chooseImage').addEventListener('click', function (params) {
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      console.log(localIds);
    }
  });
  wx.scanQRCode({
    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
    success: function (res) {
      var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
    }
  });
})
