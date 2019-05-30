### HTTP 报头字段列表

[TOC]

HTTP报头字段 是 HTTP中请求和响应消息的头部部分的组件。他们是定义HTTP事务的操作参数

头部字段在`请求行`或者`响应行`发出之后，才会被传送；

首先让我们以`RFC 7230 `为例了解一下 报文格式 `Message Format`:

#### Message Format 报文格式

```http
RFC 7230     HTTP/1.1 Message Syntax and Routing      June 2014

1、报文格式

HTTP-message = start-line
               *( header-field CRLF )(0或多个)
               CRLF（回车换行表明头部部分的结束）
               [ message-body ]

1.1、start-line

start-line = request-line / status-line

一个HTTP消息可以是客户端发往服务器的一个request请求也可以是服务器响应客户端的response响应。
这个两者的区别就在于 start-line 是 request-line (针对请求) 或者 status-line（针对响应）.

在理论上，一个客户端可以接收请求和一个服务端可以接收响应，根据他们的不同的 start-line.但是在实践中
，服务器是被用来实现只希望接收一个请求（响应是作为一个未知名或者不合法的请求的一个解释）和客户端是实现只接受响应的。

1.2、reqest-line

request-line = method SP(空格) request-target SP HTTP-version CRLF(回车换行)

method token 表明请求资源的请求方法，大小写敏感：

+---------+-------------------------------------------------+-------+
   | Method  | Description                                     | Sec.  |
   +---------+-------------------------------------------------+-------+
   | GET     | Transfer a current representation of the target | 4.3.1 |
   |         | resource.                                       |       |
   |         | 传输目标资源的当前表示                              |       |
   | HEAD    | Same as GET, but only transfer the status line  | 4.3.2 |
   |         | and header section.                             |       |
   |         | 只传输状态行和头部                                 |       |
   | POST    | Perform resource-specific processing on the     | 4.3.3 |
   |         | request payload.                                |       |
   |         | 请求负载中执行指定资源的处理                         |       |
   | PUT     | Replace all current representations of the      | 4.3.4 |
   |         | target resource with the request payload.       |       |
   |         | 在请求负载中替换目标资源的当前表示                    |       |
   | DELETE  | Remove all current representations of the       | 4.3.5 |
   |         | target resource.                                |       |
   |         | 移除目标资源的所有现在的表示                         |       |
   | CONNECT | Establish a tunnel to the server identified by  | 4.3.6 |
   |         | the target resource.                            |       |
   |         | 目标资源定义建立的一个连接服务器的通道                 |       |
   | OPTIONS | Describe the communication options for the      | 4.3.7 |
   |         | target resource.                                |       |
   |         | 描述目标资源的连接参数                              |       |
   | TRACE   | Perform a message loop-back test along the path | 4.3.8 |
   |         | to the target resource.                         |       |
   |         | 跟随目标资源执行一个消息回环测试                      |       |
   +---------+-------------------------------------------------+-------+

request-target 是当前请求要求获取的资源

接收者会用空格隔开的方式去格式化 request-line 到它的组件里面。不用空格隔开的话，只能有三个组件。
不幸运的是，一些用户代理不能去合理的解压或者解码超文本里面发现的空格。导致了这些不允许的字符被发送到请求的目标那里。

接收者的一个非法 request-line 应该被请求目标回应 400（bad request）错误 或者 301（永久移除）；
接收者不应该尝试去自动更正然后没有重定向地处理这个请求，因为非法的 reqest-line 会跟着请求链故意精心的绕过安全过滤策略。

HTTP并不会预先设置一个request-line的长度。服务器如果接收一个比其他任何请求都长的请求的时候，会反馈一个 501 （没有实现）的状态码。一个服务器接收一个比任何URL都长的请求目标是，它希望解析必须回应一个 414 （URL Too long）的状态码。

1.3、status code 状态码




```

