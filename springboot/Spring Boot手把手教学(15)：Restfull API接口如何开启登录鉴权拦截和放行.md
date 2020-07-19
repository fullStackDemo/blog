[TOC]

## 1 前言

在常规的业务开发中，切记不可把接口服务暴露给任何人都可以访问，不然别人可以任意查看或者修改你的数据，这是很严重的事情。除了常规从网段IP方面限制固定客户端IP的范围，接口本身也要增加安全验证，这里我们使用基于JWT的Token登录认证；

问题是我们如果自定义控制，哪些接口是需要经过验证，哪些接口是不需要通过验证的呢？有人可能会说，直接全部验证不就可以了，何苦纠结。但是在真实的业务中，有些接口是不能强制校验的，比如一些用户分享到微信的那种接口，是不能增加验证，否则分享的页面无法正常显示

这个时候我们又需要对其放行，那么该怎么做呢？

接下来让我们一一说明；

让我们从JWT开始说起；

## 2 JWT

### 2.1 什么是JWT

这里我们使用基于JWT的Token登录认证；

> 那么JWT是什么呢？

`JWT（Json web tokens)` 是为了在网络应用环境间传递声明而执行的一种基于`JSON`的开放标准（(RFC 7519)  定义了一种简洁的，自包含的方法用于通信双方之间以`JSON`对象的形式安全的传递信息。因为数字签名的存在，这些信息是可信的，JWT可以使用`HMAC`算法或者是`RSA`的公私秘钥对进行签名。

![img](assets/1112483-20190611145708150-705005801.png)

> JWT加密后的token如下：
>
> 分为三部分，分别用`.`点分隔开，每个部分保存不同的信息

~~~json
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7dXNlck5hbWU9dGVzdCwgdXNlcklkPTBiMTNkZDZjZTdlNTRkOGQ4NGI3NDg1NDEyOTlhOTI3fSIsInBhc3N3b3JkIjoiMmFkMGZhODVkMGU4ZmM1NTkzYmI5Y2I4OTM3NTAzMDIiLCJ1c2VyTmFtZSI6InRlc3QiLCJleHAiOjE1OTUwODAzNDgsInVzZXJJZCI6IjBiMTNkZDZjZTdlNTRkOGQ4NGI3NDg1NDEyOTlhOTI3IiwiaWF0IjoxNTk1MDczMTQ4LCJqdGkiOiJmZDUzMzFkMy0xODk3LTQ5MWQtYmY4Ny0xZjRhNDllMmI4MGIifQ.OpVIfLE4IeV4UXdzpocTO6k1f5tnkolBHEkHEL9vPtM
~~~

![image-20200718195706716](assets/image-20200718195706716.png)

三部分每一个部分都是使用[Base64URL](https://en.wikipedia.org/wiki/Base64)编码。

接下来让我们把每段编码后的内容反编码一下：

> 第一段：eyJhbGciOiJIUzI1NiJ9

![image-20200718201404600](assets/image-20200718201404600.png)

> 第二段：eyJzdWIiOiJ7dXNlck5hbWU9dGVzdCwgdXNlcklkPTBiMTNkZDZjZTdlNTRkOGQ4NGI3NDg1NDEyOTlhOTI3fSIsInBhc3N3b3JkIjoiMmFkMGZhODVkMGU4ZmM1NTkzYmI5Y2I4OTM3NTAzMDIiLCJ1c2VyTmFtZSI6InRlc3QiLCJleHAiOjE1OTUwODAzNDgsInVzZXJJZCI6IjBiMTNkZDZjZTdlNTRkOGQ4NGI3NDg1NDEyOTlhOTI3IiwiaWF0IjoxNTk1MDczMTQ4LCJqdGkiOiJmZDUzMzFkMy0xODk3LTQ5MWQtYmY4Ny0xZjRhNDllMmI4MGIifQ

![image-20200718202209167](assets/image-20200718202209167.png)

结果发现，反编译竟然失败了，第二段没有第一段那么容易反编译出来；

不过官网说了用BASE64加密，不知道什么情况？

突然想到加密以下内容看下生成的格式是怎么样的，是否是一致的？

~~~json
{
  "sub": "{userName=test, userId=0b13dd6ce7e54d8d84b748541299a927}",
  "password": "2ad0fa85d0e8fc5593bb9cb893750302",
  "userName": "test",
  "exp": 1595080348,
  "userId": "0b13dd6ce7e54d8d84b748541299a927",
  "iat": 1595073148,
  "jti": "fd5331d3-1897-491d-bf87-1f4a49e2b80b"
}
~~~

![image-20200718203059904](assets/image-20200718203059904.png)

结果为不一致的，但是每次修改左侧内容，👉右边生成的最后一个字符都是==, 莫非和这个有关？

所以我打算试一下，在第二段代码后加==后反编码一下：

![image-20200718203203598](assets/image-20200718203203598.png)

神奇的一幕发生了，竟然反编译成功了，第二段信息和官网debugger出来的信息一模一样，我只能呵呵了。

![image-20200718203320243](assets/image-20200718203320243.png)

🈸️

![image-20200718203439448](assets/image-20200718203439448.png)

> 对于这个疑惑，我还是打算深究一下，最终在维基百科中找到了答案

**Base64**是一种基于64个可打印字符来表示二进制数据的表示方法。由于2的6次方是64，所以每6个比特是一个单元，可对应一个可打印的字符。3个字节相当于24个比特，对应于4个Base64单元，即3个字节可由4个可打印字符来表示

若原数据长度不是3的倍数时且剩下1个输入数据，则在编码结果后加2个`=`；若剩下2个输入数据，则在编码结果后加1个`=`。

所以由于=字符也可能出现在Base64编码中，但=用在URL、Cookie里面会造成歧义，所以，很多Base64编码后会把=去掉：

为解决此问题，BASE64URL可采用一种**用于URL的改进Base64**编码，它不在末尾填充`=`号。所以我们使用Base64只能靠尾部添加==，去解密；

> 接下来我们使用自己写的BASE64解密方法试试看：

~~~java
package com.scaffold.test.utils;

import com.alibaba.fastjson.JSON;

import java.util.Base64;

/**
 * @author alex
 */

public class Base64Url {

    /**
     * base64加密
     *
     * @param content
     * @return
     */
    public static String encode(Object content) {
        Base64.Encoder encoder = Base64.getUrlEncoder();
        byte[] data = JSON.toJSONString(content).getBytes();
        return encoder.encodeToString(data);
    }

    /**
     * base64解密
     * @param text
     * @return
     */
    public static String decode(String text) {
        Base64.Decoder decoder = Base64.getUrlDecoder();
        byte[] data = decoder.decode(text);
        return new String(data);
    }


    public static void main(String[] args){

        System.out.println(Base64Url.encode(JSON.parseObject("{\"sub\":\"{userName=test, userId=0b13dd6ce7e54d8d84b748541299a927}\",\"password\":\"2ad0fa85d0e8fc5593bb9cb893750302\",\"userName\":\"test\",\"exp\":1595080348,\"userId\":\"0b13dd6ce7e54d8d84b748541299a927\",\"iat\":1595073148,\"jti\":\"fd5331d3-1897-491d-bf87-1f4a49e2b80b\"}")));

        System.out.println(Base64Url.decode("eyJzdWIiOiJ7dXNlck5hbWU9dGVzdCwgdXNlcklkPTBiMTNkZDZjZTdlNTRkOGQ4NGI3NDg1NDEyOTlhOTI3fSIsInBhc3N3b3JkIjoiMmFkMGZhODVkMGU4ZmM1NTkzYmI5Y2I4OTM3NTAzMDIiLCJ1c2VyTmFtZSI6InRlc3QiLCJleHAiOjE1OTUwODAzNDgsInVzZXJJZCI6IjBiMTNkZDZjZTdlNTRkOGQ4NGI3NDg1NDEyOTlhOTI3IiwiaWF0IjoxNTk1MDczMTQ4LCJqdGkiOiJmZDUzMzFkMy0xODk3LTQ5MWQtYmY4Ny0xZjRhNDllMmI4MGIifQ"));
    }

}
~~~

~~~json
# 加密之后同样带有==，应该原字符长度不够3的倍数
eyJzdWIiOiJ7dXNlck5hbWU9dGVzdCwgdXNlcklkPTBiMTNkZDZjZTdlNTRkOGQ4NGI3NDg1NDEy
OTlhOTI3fSIsInBhc3N3b3JkIjoiMmFkMGZhODVkMGU4ZmM1NTkzYmI5Y2I4OTM3NTAzMDIiLCJ1
c2VyTmFtZSI6InRlc3QiLCJleHAiOjE1OTUwODAzNDgsInVzZXJJZCI6IjBiMTNkZDZjZTdlNTRk
OGQ4NGI3NDg1NDEyOTlhOTI3IiwiaWF0IjoxNTk1MDczMTQ4LCJqdGkiOiJmZDUzMzFkMy0xODk3
LTQ5MWQtYmY4Ny0xZjRhNDllMmI4MGIifQ==

# 我们解密不带==的加密后的字符串，不用补全==，内部方法对==有相关处理，可以直接被解密
{"sub":"{userName=test, userId=0b13dd6ce7e54d8d84b748541299a927}","password":"2ad0fa85d0e8fc5593bb9cb893750302","userName":"test","exp":1595080348,"userId":"0b13dd6ce7e54d8d84b748541299a927","iat":1595073148,"jti":"fd5331d3-1897-491d-bf87-1f4a49e2b80b"}"
~~~
好了，这个疑问到此结束，让我们继续往下进行。
> 第三段：OpVIfLE4IeV4UXdzpocTO6k1f5tnkolBHEkHEL9vPtM
>
> 这段是数字签名算法逻辑

~~~java
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  your-256-bit-secret
) secret base64 encoded
~~~

### 2.2 JWT组成部分

第一部分是Header，第二部是Body，第三部分是Signature签名

> Header
>
> JWT 签名算法规则 algorithm

~~~json
{
  "alg": "HS256"
}
~~~

> Body
>
> JWT的主要信息，也就是 claim

~~~json
{
  "sub": "{userName=test, userId=0b13dd6ce7e54d8d84b748541299a927}",
  "password": "2ad0fa85d0e8fc5593bb9cb893750302",
  "userName": "test",
  "exp": 1595080348,
  "userId": "0b13dd6ce7e54d8d84b748541299a927",
  "iat": 1595073148,
  "jti": "fd5331d3-1897-491d-bf87-1f4a49e2b80b"
}
~~~

> Signature
>
> 签名：通过把Header、Body中的信息按照algorithm算法进行计算

~~~java
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
	your-256-bit-secret
)
~~~

### 2.3 maven依赖

~~~xml
<!-- jjwt支持 -->
<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt</artifactId>
  <version>0.9.1</version>
</dependency>

<dependency>
  <groupId>com.auth0</groupId>
  <artifactId>java-jwt</artifactId>
  <version>3.4.0</version>
</dependency>
~~~

### 2.4 JWT实现原理

> 1、假设我们有以下header和body(Claims)数据

**header**

~~~json
{
  "alg": "HS256"
}
~~~

**body**

~~~json
{
  "sub": "{userName=test, userId=0b13dd6ce7e54d8d84b748541299a927}",
  "password": "2ad0fa85d0e8fc5593bb9cb893750302",
  "userName": "test",
  "exp": 1595080348,
  "userId": "0b13dd6ce7e54d8d84b748541299a927",
  "iat": 1595073148,
  "jti": "fd5331d3-1897-491d-bf87-1f4a49e2b80b"
}
~~~

> 2、移除所有JSON空格

~~~java
String header = '{"alg":"HS256"}';
String claims = "{"sub":"{userName=test, userId=0b13dd6ce7e54d8d84b748541299a927}","password":"2ad0fa85d0e8fc5593bb9cb893750302","userName":"test","exp":1595080348,"userId":"0b13dd6ce7e54d8d84b748541299a927","iat":1595073148,"jti":"fd5331d3-1897-491d-bf87-1f4a49e2b80b"}";
~~~

> 3、获取UTF-8字节和使用`Base64URL`编码

~~~java
String encodedHeader = base64URLEncode( header.getBytes("UTF-8") );
String encodedClaims = base64URLEncode( claims.getBytes("UTF-8") );
~~~

> 4、连接字符串，拼接内容

~~~java
String concatenated = encodedHeader + '.' + encodedClaims;
~~~

> 5、使用足够强的加密私钥,以及选择的签名算法(我们将使用hmac - sha - 256),并签署连接字符串

~~~java
Key key = getMySecretKey()
byte[] signature = hmacSha256( concatenated, key )
~~~

> 6、把签名使用`Base64URL`编码，使用点号分开，拼接下字符串

~~~java
String jws = concatenated + '.' + base64URLEncode( signature );
~~~

然后你都得到了一个`JWS`如下：

~~~java
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7dXNlck5hbWU9dGVzdCwgdXNlcklkPTBiMTNkZDZjZTdlNTRkOGQ4NGI3NDg1NDEyOTlhOTI3fSIsInBhc3N3b3JkIjoiMmFkMGZhODVkMGU4ZmM1NTkzYmI5Y2I4OTM3NTAzMDIiLCJ1c2VyTmFtZSI6InRlc3QiLCJleHAiOjE1OTUwODAzNDgsInVzZXJJZCI6IjBiMTNkZDZjZTdlNTRkOGQ4NGI3NDg1NDEyOTlhOTI3IiwiaWF0IjoxNTk1MDczMTQ4LCJqdGkiOiJmZDUzMzFkMy0xODk3LTQ5MWQtYmY4Ny0xZjRhNDllMmI4MGIifQ.OpVIfLE4IeV4UXdzpocTO6k1f5tnkolBHEkHEL9vPtM
~~~

`JWS（Json web signature）`也是`JWT`的简称。

以上代码我们不需要手动实现，我们这里是使用`JJWT`就是`java`版本的`JWT`，所有的方法都已经封装好;

### 2.5 JWT实现方法

> 实现步骤：
>
> 1、使用 `Jwts.builder()` 方法创建一个 `JwtBuilder`实例
>
> 2、调用 `JwtBuilder` 方法添加 `header` 参数信息和 `claims`
>
> 3、指定一个 `SecretKey` 或者一个不对称的 `PrivateKey` ，用来签名JWT
>
> 4、最后, 调用 `compact()`方法去拼接然后获得签名，得到JWS

~~~java
String jws = Jwts.builder() // (1)

    .setSubject("Bob")      // (2) 

    .signWith(key)          // (3)
     
    .compact();             // (4)
~~~

> #### Header Parameters
>
> 默认是不需要设置alg的，如果要添加其他的，可以如下：

~~~java
String jws = Jwts.builder()

    .setHeaderParam("kid", "myKeyId")
    
    // ... etc ...
~~~

