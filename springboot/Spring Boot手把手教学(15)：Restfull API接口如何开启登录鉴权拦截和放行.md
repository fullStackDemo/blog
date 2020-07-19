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
  
  
// 或者另外一个写法
  
Header header = Jwts.header();

populate(header); //implement me

String jws = Jwts.builder()

    .setHeader(header)
    
    // ... etc ...
~~~

> #### Claims
>
> 是JWT的“身体”,包含JWT创造者希望给JWT接受者的信息

~~~java
Map<String,Object> claims = getMyClaimsMap(); //implement me

String jws = Jwts.builder()

    .setClaims(claims)
    
    // ... etc ...
~~~

~~~java
// 创建payload的私有声明（根据特定的业务需要添加，如果要拿这个做验证，一般是需要和jwt的接收方提前沟通好验证方式的）
Map<String, Object> claims = new HashMap<>();
claims.put("userId", user.getUserId());
claims.put("userName", user.getUserName());
claims.put("password", user.getPassword());

~~~

**JwtBuilder方法如下**

- `setIssuer`: sets the [`iss` (Issuer) Claim](https://tools.ietf.org/html/rfc7519#section-4.1.1)
- `setSubject`: sets the [`sub` (Subject) Claim](https://tools.ietf.org/html/rfc7519#section-4.1.2)
- `setAudience`: sets the [`aud` (Audience) Claim](https://tools.ietf.org/html/rfc7519#section-4.1.3)
- `setExpiration`: sets the [`exp` (Expiration Time) Claim](https://tools.ietf.org/html/rfc7519#section-4.1.4)
- `setNotBefore`: sets the [`nbf` (Not Before) Claim](https://tools.ietf.org/html/rfc7519#section-4.1.5)
- `setIssuedAt`: sets the [`iat` (Issued At) Claim](https://tools.ietf.org/html/rfc7519#section-4.1.6)
- `setId`: sets the [`jti` (JWT ID) Claim](https://tools.ietf.org/html/rfc7519#section-4.1.7)

~~~java
String jws = Jwts.builder()

    .setIssuer("me")
    .setSubject("Bob")
    .setAudience("you")
    .setExpiration(expiration) //a java.util.Date
    .setNotBefore(notBefore) //a java.util.Date 
    .setIssuedAt(new Date()) // for example, now
    .setId(UUID.randomUUID()) //just an example id
    
    /// ... etc ...
~~~

> 签名,

**SecretKey加密key**

~~~java
  /**
     * 由字符串生成加密key
     *
     * @return SecretKey
     */
    private static SecretKey generalKey(String stringKey) {
        byte[] encodedKey = Base64.decodeBase64(stringKey);
        return new SecretKeySpec(encodedKey, 0, encodedKey.length, "AES");
    }
~~~

~~~java
String jws = Jwts.builder()

   // ... etc ...
   // 默认带有第二个参数是算法HS256
   .signWith(key) // <---1
  // 或者指定签名的时候使用的签名算法
   .signWith(SignatureAlgorithm.HS256, secretKey) // <---1
   
   .compact();
~~~

> `jws`完整实现

~~~java
JwtBuilder jws = Jwts.builder()
  // 如果有私有声明，一定要先设置这个自己创建的私有的声明，这个是给builder的claim赋值，一旦写在标准的声明赋值之后，就是覆盖了那些标准的声明的
  .setClaims(claims)
  // 唯一随机UUID
  // 设置JWT ID：是JWT的唯一标识，根据业务需要，这个可以设置为一个不重复的值，主要用来作为一次性token,从而回避重放攻击
  .setId(UUID.randomUUID().toString())
  // jwt的签发时间
  .setIssuedAt(now)
  // 代表这个JWT的主体，即它的所有人，这个是一个json格式的字符串，可以存放什么userid，roldid之类的，作为什么用户的唯一标志
  .setSubject(subject)
  // 设置签名使用的签名算法和签名使用的秘钥
  .signWith(signatureAlgorithm, key)
  
  .compact();
~~~

### 2.6 JWT读取

> 实现步骤：
>
> 1、用 `Jwts.parserBuilder()` 创建一个 `JwtParserBuilder` 实例；
>
> 2、指定之前设置的 `SecretKey` 或者 非对称的 `PublicKey` 验证 JWS 签名；
>
> 3、调用build()` 方法返回一个安全线程的 `JwtParser`；
>
> 4、最后, 调用 `parseClaimsJws(token)` 方法返回一个原始的 JWS；
>
> 5、调用getBody()方法，获取一个JSON格式的Claims

~~~java
Jws<Claims> jws;
// 获取私有声明
Claims claims;
try {
    jws = Jwts.parserBuilder()  // (1)
    .setSigningKey(key)         // (2)
    .build()                    // (3)
    .parseClaimsJws(jwsString)；// (4);                
    
    // we can safely trust the JWT
    claims = jws.getBody();    // (5)
}  
catch (JwtException ex) {       
    
    // we *cannot* use the JWT as intended by its creator
}
  
  // 之后就可以获取Claims中信息了

~~~

~~~java
  /**
     * 解密token，获取声明的实体
     *
     * @param token 加密后的token
     * @return claims
     */
    public static Claims parseToken(String token, User user) {
        // 签名秘钥，和生成的签名的秘钥要保持一模一样
        SecretKey key = generalKey(SECRETKEY + user.getPassword());

        // 获取私有声明
        Claims claims;

        try {
            claims = Jwts.parser()
                    // 设置签名的秘钥
                    .setSigningKey(key)
                    // 设置需要解析的token
                    .parseClaimsJws(token).getBody();
        } catch (Exception e) {
            return null;
        }

        return claims;
    }
~~~

~~~java
/**
     * 校验token
     *
     * @param token 加密后的token
     * @param user  用户信息
     * @return true|false
     */
    public static Boolean verify(String token, User user) {

        // 获取私有声明的实体
        Claims claims = parseToken(token, user);

        try {
            // 数据库用户密码
            String userPassword = user.getPassword();

            // token中获取的用户密码
            String tokenPassword = (String) claims.get("password");

            return tokenPassword.equals(userPassword);
        } catch (Exception e) {
            return false;
        }

    }
~~~

### 2.7 工具类方法

> com.scaffold.test.utils.JWTUtils

~~~java
package com.scaffold.test.utils;

import com.scaffold.test.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.commons.codec.binary.Base64;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class JWTUtils {

    /**
     * 生成签名的时候使用的秘钥secret
     */
    private static final String SECRETKEY = "KJHUhjjJYgYUllVbXhKDHXhkSyHjlNiVkYzWTBac1Yxkjhuad";

    /**
     * expirationDate 生成jwt的有效期，单位秒
     */
    private static final long EXPIRATION_DATE = 2 * 60 * 60;


    /**
     * 由字符串生成加密key
     *
     * @return SecretKey
     */
    private static SecretKey generalKey(String stringKey) {
        byte[] encodedKey = Base64.decodeBase64(stringKey);
        return new SecretKeySpec(encodedKey, 0, encodedKey.length, "AES");
    }

    /**
     * 创建 jwt
     *
     * @param user 登录成功后的用户信息
     * @return jwt token
     */
    public static String createToken(User user) {

        // 指定签名的时候使用的签名算法，也就是header那部分，jwt已经将这部分内容封装好了
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        // 生成JWT的时间
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        // 创建payload的私有声明（根据特定的业务需要添加，如果要拿这个做验证，一般是需要和jwt的接收方提前沟通好验证方式的）
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getUserId());
        claims.put("userName", user.getUserName());
        claims.put("password", user.getPassword());

        // 生成签名的时候使用的秘钥secret,这个方法本地封装了的，一般可以从本地配置文件中读取，切记这个秘钥不能外露哦。它就是你服务端的私钥，在任何场景都不应该流露出去。一旦客户端得知这个secret, 那就意味着客户端是可以自我签发jwt了
        SecretKey key = generalKey(SECRETKEY + user.getPassword());

        // 生成签发人
        // json形式字符串或字符串，增加用户非敏感信息存储，如用户id或用户账号，与token解析后进行对比，防止乱用
        HashMap<String, Object> storeInfo = new HashMap<String, Object>();
        storeInfo.put("userId", user.getUserId());
        storeInfo.put("userName", user.getUserName());
        String subject = storeInfo.toString();

        // 下面就是在为payload添加各种标准声明和私有声明了
        // 这里其实就是new一个JwtBuilder，设置jwt的body
        JwtBuilder builder = Jwts.builder()
                // 如果有私有声明，一定要先设置这个自己创建的私有的声明，这个是给builder的claim赋值，一旦写在标准的声明赋值之后，就是覆盖了那些标准的声明的
                .setClaims(claims)
                // 唯一随机UUID
                // 设置JWT ID：是JWT的唯一标识，根据业务需要，这个可以设置为一个不重复的值，主要用来作为一次性token,从而回避重放攻击
                .setId(UUID.randomUUID().toString())
                // jwt的签发时间
                .setIssuedAt(now)
                // 代表这个JWT的主体，即它的所有人，这个是一个json格式的字符串，可以存放什么userid，roldid之类的，作为什么用户的唯一标志
                .setSubject(subject)
                // 设置签名使用的签名算法和签名使用的秘钥
                .signWith(signatureAlgorithm, key);

        if (EXPIRATION_DATE >= 0) {
            long expMillis = nowMillis + EXPIRATION_DATE * 1000;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);
        }
        return builder.compact();
    }

    /**
     * 解密token，获取声明的实体
     *
     * @param token 加密后的token
     * @return claims
     */
    public static Claims parseToken(String token, User user) {
        // 签名秘钥，和生成的签名的秘钥要保持一模一样
        SecretKey key = generalKey(SECRETKEY + user.getPassword());

        // 获取私有声明
        Claims claims;

        try {
            claims = Jwts.parser()
                    // 设置签名的秘钥
                    .setSigningKey(key)
                    // 设置需要解析的token
                    .parseClaimsJws(token).getBody();
        } catch (Exception e) {
            return null;
        }

        return claims;
    }

    /**
     * 校验token
     *
     * @param token 加密后的token
     * @param user  用户信息
     * @return true|false
     */
    public static Boolean verify(String token, User user) {

        // 获取私有声明的实体
        Claims claims = parseToken(token, user);

        try {
            // 数据库用户密码
            String userPassword = user.getPassword();

            // token中获取的用户密码
            String tokenPassword = (String) claims.get("password");

            return tokenPassword.equals(userPassword);
        } catch (Exception e) {
            return false;
        }

    }

}
~~~

