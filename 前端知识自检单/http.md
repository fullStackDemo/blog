## HTTP

[TOC]

`Hypertext transfer protocol`（简称：`HTTP`）`超文本传输协议`。`HTTP`是`WWW`(world wide web 万维网)在一个`超文本`里面包含`超链接`的数据通信的基础。

`HTTP`的发展起始于1989年被 `Tim Berners-Lee` 在 `CERN `创立。HTTP标准的发展是被`IEIF(Internet Engineering Task Force) `和` W3C (world wide web consortium)`调整，并在提出 `RFCs(request for comments)`后达到了顶点。

`HTTP`的第一个修订版`HTTP/1.1`,在1997被广泛应用，不过 在 1999 年被 `RFC 2616`废弃，之后在2014年又出现了 `RFC 7230`；

稍后，在2015年，提出了 继任者HTTP/2（之后的继任者是HTTP/3, 建立在 HTTP/2之上）,现在被大部分主要的web服务器和浏览器通过 `TSL(Transport Layer Security 传输层协议) `使用` ALPN (Application-Layer Protocol Negotiation 应用层协议协商)`扩展支持的。

#### 1 技术介绍

`HTTP`方法作为一个`请求-响应`在`客户端-服务器`计算模式。举例，比如一个`web浏览器`,或者是一个`客户端`或`应用程序`运行在拥有网站域名的`电脑主机上`。客户端发起一个 `HTTP request` 请求，提供资源比如 HTML或者其他资源或代表客户机执行其他行为的`一个服务器`，返回一个`response message`响应的消息给客户端。返回的`响应信息`包含了请求的完整信息状态和或许会包含`请求的内容`。

浏览器就是一个用户代理（`user agent UA`)。其他的用户代理包括，搜索提供服务的索引浏览器（web爬虫），语音浏览器，移动`apps`和其他软件，访问、消耗或者展示 网页内容。

HTTP被设计去允许网络中间件元素去提高或者加强客户端和服务器之间的通信。





