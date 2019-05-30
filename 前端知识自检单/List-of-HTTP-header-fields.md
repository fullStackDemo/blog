### HTTP 报头字段列表

[TOC]

HTTP报头字段 是 HTTP中请求和响应消息的头部部分的组件。他们是定义HTTP事务的操作参数

头部字段在`请求行`或者`响应行`发出之后，才会被传送；

首先让我们以`RFC 7230 `为例了解一下 报文格式 `Message Format`:

#### 1、Message Format 报文格式

```http
RFC 7230     HTTP/1.1 Message Syntax and Routing      June 2014
HTTP-message = start-line
               *( header-field CRLF )(0或多个)
               CRLF（回车换行表明头部部分的结束）
               [ message-body ]

```

##### 1.1、start-line 开始行

```http
start-line = request-line / status-line

一个HTTP消息可以是客户端发往服务器的一个request请求也可以是服务器响应客户端的response响应。
这个两者的区别就在于 start-line 是 request-line (针对请求) 或者 status-line（针对响应）.

在理论上，一个客户端可以接收请求和一个服务端可以接收响应，根据他们的不同的 start-line.但是在实践中
，服务器是被用来实现只希望接收一个请求（响应是作为一个未知名或者不合法的请求的一个解释）和客户端是实现只接受响应的。
```

##### 1.2、request-line 请求行

```http
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
```

##### 1.3、status line 状态行

```http
status-line = HTTP-version SP status-code SP reason-phrase CRLF

响应消息的第一行就是 status-line，由 协议版本 + SP + statusCode + SP + reason-phrase + CRLF 组成。

status-code = 3DIGIT （三个数字）

状态码用来描述服务器尝试理解和满足客户端相应请求的结果。其他的响应信息是用来解释状态码的定义。
状态码是可以扩展的，客户端不用去理解注册的状态码的含义，尽管这样的理解是明显令人向往的。
但是客户端必须懂得这些状态码的分类，也就是第一个数字，不能把一个未被认可的状态码等价于 X00, 客户端不能缓存一个带有未知名状态码的响应消息。

第一个数字代表状态码的分类，其他两个数字没有明显的分类规则，总共有5类状态码：

1XX (Informational信息)： 请求被接收，持续处理的过程。
2XX (Successfull成功): 请求被成功接收，解读和接受。
3XX (Redirection重定向): 为了完成请求过程，更多的动作需要去执行。
4XX (Client error 客户端错误): 请求包含错误的语法或者不能被实现。
5XX (Server error 服务器错误): 服务器不能实现一个显然合法的请求。

reason-phrase  = *( HTAB / SP / VCHAR / obs-text )

reason-phrase设计的最底层目的是为了提供一个当前状态码的文本描述。客户端可忽略。

```

##### 1.4、Header Fields 头部字段

每一个`头部字段`由一个`大小写不敏感的字段名字`，跟着一个`冒号`，`可选的空格`，`字段值`和`可选的尾部空格`组成。

```http
header-field = field-name  ":" OWS(可选的空格) field-value OWS

 		 field-name     = token
     field-value    = *( field-content / obs-fold )
     field-content  = field-vchar [ 1*( SP / HTAB ) field-vchar ]
     field-vchar    = VCHAR / obs-text

     obs-fold       = CRLF 1*( SP / HTAB )
                    ; obsolete line folding
                    
```



##### 1.5、message body

```http
 message-body = *OCTET
 
一个HTTP消息的消息正文是用来携带请求或者响应的负载正文。
消息体是和有效载荷体是一致的，除非一个传输编码已经被完成。

消息中允许的消息主体的规则在请求和响应中是不同的。

request 请求中的 message body的预定义是被 Content-Length 或 Transfer-Encoding 头部字段控制。

请求消息框架是和method的语义无关的。甚至请求方法对消息体没有任何用处。

响应消息中的message body存在与否决定于请求的方法和响应返回的状态码。
HEAD请求不会返回 message body，因为它只是关联响应头部字段。即使存在 message body ，如果方法是GET也是表明将会显示什么值.
所有 1XX 204 304 都不会有 message body.

```

#### 2、Standard request fields 标准请求头字段

| 字段名                                                       | 说明                                                         | 举例                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| A-IM                                                         | 对请求可接受的接口实例化,同accept                            | A-IM: feed                                                   |
| Accept                                                       | response可接受的媒体类型                                     | Accept: text/html<br />其他：text/html; q=1.0, text/\*; q=0.8, image/gif; q=0.6, image/jpeg; q=0.6, image/\*; q=0.5, \*/\*; q=0.1 |
| Accept-Charset                                               | 可接受的字符集                                               | Accept-Charset: utf-8                                        |
| Accept-Encoding                                              | 可接受的文件解码格式                                         | Accept-Encoding: gzip, deflate                               |
| Accept-Language                                              | response可接受的人类语言                                     | Accept-Language: en-US                                       |
| Accept-Datetime                                              | 可接受的时间版本                                             | Accept-Datetime: Thu, 31 May 2007 20:35:00 GMT               |
| Access-Control-Request-Method,<br/>Access-Control-Request-Headers | 利用origin发起跨域资源请求                                   | Access-Control-Request-Method: GET<br />                     |
| Authorization                                                | HTTP认证                                                     | Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==            |
| Cache-Control                                                | 用来指定一个在请求响应链中所有缓存机制必须遵守的一个指令     | Cache-Control: no-cache                                      |
| Connection                                                   | 当前连接和持续请求的的控制参数。HTTP/2不得用这个方法，默认持续连接 | Connection: keep-alive<br />Connection: Upgrade              |
| Content-Length                                               | request body的长度                                           | Content-Length: 348                                          |
| Content-Type                                                 | request body的媒体格式（POST 和 PUT适用）                    | Content-Type: application/x-www-form-urlencoded              |
| Cookie                                                       | 一个被服务器用set-cookie发送的数据                           | Cookie: $Version=1; Skin=new;                                |
| Date                                                         | message发出的时间                                            | Date: Tue, 15 Nov 1994 08:12:31 GMT                          |
| Expect                                                       | 客户端表明的特殊的服务器要做的行为                           | Expect: 100-continue                                         |
|                                                              |                                                              |                                                              |
|                                                              |                                                              |                                                              |
|                                                              |                                                              |                                                              |
|                                                              |                                                              |                                                              |

