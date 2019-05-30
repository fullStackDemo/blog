### HTTP 报头字段列表

HTTP报头字段 是 HTTP中请求和响应消息的头部部分的组件。他们是定义HTTP事务的操作参数

头部字段在`请求行`或者`响应行`发出之后，才会被传送；

一些核心的字段组合是被`IEIF`标准化。

```http
RFC 7230     HTTP/1.1 Message Syntax and Routing      June 2014

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

```

