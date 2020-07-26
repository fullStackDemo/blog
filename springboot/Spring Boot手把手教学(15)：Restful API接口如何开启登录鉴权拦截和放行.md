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

### 2.5 JJWT实现方法

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
package com.scaffold.test.config.interceptor;

import com.alibaba.fastjson.JSONObject;
import com.scaffold.test.base.Result;
import com.scaffold.test.base.ResultCode;
import com.scaffold.test.base.ResultGenerator;
import com.scaffold.test.config.annotation.PassToken;
import com.scaffold.test.entity.User;
import com.scaffold.test.service.UserService;
import com.scaffold.test.utils.BaseUtils;
import com.scaffold.test.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;

/**
 * 拦截器
 */

public class AuthenticationInterceptor implements HandlerInterceptor {

    @Autowired
    UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        // token
        String token = BaseUtils.getToken();

        // 如果不是响应方法，静态资源直接放行
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }

        // 带 @PassToken 注解放行
        HandlerMethod handlerMethod = (HandlerMethod) handler;
        Method method = handlerMethod.getMethod();
        if(method.isAnnotationPresent(PassToken.class)){
            PassToken annotation = method.getAnnotation(PassToken.class);
            if(annotation.required()){
                return true;
            }
        }

        // 设置响应格式
        response.setContentType("application/json;charset=UTF-8");

        // 验证token非空
        if (token == null || token.equals("null")) {
            Result result = ResultGenerator.setFailResult(ResultCode.UNAUTHORIZED, "无token,请重新登录");
            response.getWriter().write(getJSONObject(result));
            return false;
        }

        // 验证TOKEN有效
        String currentUserId = BaseUtils.getCurrentUserId();
        if(currentUserId == null || currentUserId.equals("null")){
            Result result = ResultGenerator.setFailResult(ResultCode.UNAUTHORIZED, "访问异常，token不正确,请重新登录");
            response.getWriter().write(getJSONObject(result));
            return false;
        }

        // 验证用户是否存在
        User userQuery = new User();
        userQuery.setUserId(currentUserId);
        User user = userService.findUser(userQuery);
        if(user == null){
            Result result = ResultGenerator.setFailResult(ResultCode.UNAUTHORIZED, "用户不存在，token不正确,请重新登录");
            response.getWriter().write(getJSONObject(result));
            return false;
        }

        //jwt再次校验
        Boolean verify = JWTUtils.verify(token, user);
        if(!verify){
            Result result = ResultGenerator.setFailResult(ResultCode.UNAUTHORIZED, "非法访问,请重新登录");
            response.getWriter().write(getJSONObject(result));
            return false;
        }

        return true;
    }


    // 响应结果转化格式
    private static String getJSONObject(Result result) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("code", result.getCode());
        jsonObject.put("message", result.getMessage());
        return jsonObject.toJSONString();
    }
}

~~~

## 3 用户登录接口服务

### 3.1 用户表 user.sql

~~~mysql
/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 25/07/2020 07:53:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'id',
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '用户姓名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '用户密码',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `del_flag` int(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除 1删除 0存在',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;

~~~

### 3.2 UserController

~~~java
package com.scaffold.test.controller;

import com.scaffold.test.base.Result;
import com.scaffold.test.base.ResultGenerator;
import com.scaffold.test.config.annotation.PassToken;
import com.scaffold.test.entity.User;
import com.scaffold.test.service.UserService;
import com.scaffold.test.utils.BaseUtils;
import com.scaffold.test.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

/**
 * @author alex
 */

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;


    /**
     * 注册
     * @param user 用户信息
     * @return Result
     */
    @PassToken
    @PostMapping("/add")
    public Result addUser(User user) {
        int flag = userService.insertUser(user);
        if (flag == 1) {
            return ResultGenerator.setSuccessResult();
        } else {
            return ResultGenerator.setFailResult("注册失败, 用户已存在");
        }
    }

    /**
     * 登录
     * @param user 用户信息
     * @return Result
     */
    @PassToken
    @PostMapping("/login")
    public Result userLogin(User user) {
        //验证码校验
        if (!userService.checkCode(user.getCode())) {
            return ResultGenerator.setFailResult("登录失败, 验证码不正确");
        }
        User userInfo = userService.findUser(user);
        if (userInfo != null) {
            HashMap<Object, Object> result = new HashMap<>();
            result.put("token", JWTUtils.createToken(userInfo));
            return ResultGenerator.setSuccessResult(result);
        } else {
            return ResultGenerator.setFailResult("登录失败, 请检查用户名和密码");
        }
    }

    /**
     * 获取用户信息
     * @return Result
     */
    @GetMapping("/info")
    public Result getUserInfo(){
        User currentUser = BaseUtils.getCurrentUser();
        return ResultGenerator.setSuccessResult(currentUser);
    }

    /**
     * 验证码校验
     * @param code 验证码
     * @return Result
     */
    @GetMapping("/checkCaptcha")
    public Result checkCode(@RequestParam String code) {
        if (userService.checkCode(code)) {
            return ResultGenerator.setSuccessResult("success");
        } else {
            return ResultGenerator.setFailResult("fail");
        }
    }
}
~~~

### 3.3 UserService

~~~java
package com.scaffold.test.service;

import com.scaffold.test.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author alex wong
 * @since 2020-07-02
 */
public interface UserService extends IService<User> {

    int insertUser(User user);

    User findUser(User user);

    // 验证码
    boolean checkCode(String code);

}
~~~

### 3.4 UserServiceImpl

> com.scaffold.test.service.impl.UserServiceImpl

~~~java
package com.scaffold.test.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.scaffold.test.entity.User;
import com.scaffold.test.mapper.UserMapper;
import com.scaffold.test.service.UserService;
import com.scaffold.test.utils.HttpUtils;
import com.scaffold.test.utils.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author alex wong
 * @since 2020-07-02
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public int insertUser(User user) {
        int flag;
        //判断用户是否存在
        User existUser = userMapper.findUser(user);
        if (existUser == null) {
            user.setUserId(UUIDUtils.getUUID());
            userMapper.insertUser(user);
            flag = 1;
        } else {
            flag = 0;
        }
        return flag;
    }

    @Override
    public User findUser(User user) {
        return userMapper.findUser(user);
    }

    @Override
    public boolean checkCode(String code) {
        HttpSession session = HttpUtils.getSession();
        String sessionKey =(String) session.getAttribute("RANDOMKEY");
        if(sessionKey == null){
            return false;
        }
        return sessionKey.equalsIgnoreCase(code);
    }

}

~~~

###  3.5 UserMapper

~~~java
package com.scaffold.test.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.scaffold.test.entity.User;

/**
 * @author alex
 */

public interface UserMapper extends BaseMapper<User> {

    /**
     * 添加用户
     * @param user
     * @return
     */
    int insertUser(User user);

    /**
     * 查找用户
     * @param user
     * @return
     */
    User findUser(User user);
}

~~~

### 3.6 UserMapper.xml

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.scaffold.test.mapper.UserMapper">

    <!-- 通用查询映射结果 -->
    <resultMap id="BaseResultMap" type="com.scaffold.test.entity.User">
        <id column="user_id" property="userId"/>
        <result column="user_name" property="userName"/>
        <result column="password" property="password"/>
        <result column="createTime" property="createTime"/>
        <result column="updateTime" property="updateTime"/>
    </resultMap>

    <!-- 通用查询结果列 -->
    <sql id="Base_Column_List">
        user_id, user_name, password, createTime, updateTime
    </sql>

    <sql id="Base_Condition">
        <where>
            del_flag != 1
            <if test="userName != null and userName != ''">
                and user_name=#{userName}
            </if>
            <if test="userId != null and userId != ''">
                and user_id=#{userId}
            </if>
            <if test="password != null and password != ''">
                and password=#{password}
            </if>
        </where>
    </sql>

    <insert id="insertUser">
        insert into user
            (user_id, user_name, password)
        values (#{userId}, #{userName}, #{password})

    </insert>

    <select id="findUser" resultType="com.scaffold.test.entity.User">
        select
        <include refid="Base_Column_List"></include>
        from user
        <include refid="Base_Condition"></include>
    </select>


</mapper>

~~~

## 4 用户注册登录web页面

### 4.1  工具类方法

> 用户密码MD5加密
>
> src/main/resources/static/js/md5.js

~~~javascript
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s) {
	return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}

function b64_md5(s) {
	return binl2b64(core_md5(str2binl(s), s.length * chrsz));
}

function str_md5(s) {
	return binl2str(core_md5(str2binl(s), s.length * chrsz));
}

function hex_hmac_md5(key, data) {
	return binl2hex(core_hmac_md5(key, data));
}

function b64_hmac_md5(key, data) {
	return binl2b64(core_hmac_md5(key, data));
}

function str_hmac_md5(key, data) {
	return binl2str(core_hmac_md5(key, data));
}

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test() {
	return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len) {
	/* append padding */
	x[len >> 5] |= 0x80 << ((len) % 32);
	x[(((len + 64) >>> 9) << 4) + 14] = len;

	var a = 1732584193;
	var b = -271733879;
	var c = -1732584194;
	var d = 271733878;

	for (var i = 0; i < x.length; i += 16) {
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;

		a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
		d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
		c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
		b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
		a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
		d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
		c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
		b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
		a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
		d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
		c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
		b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
		a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
		d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
		c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
		b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

		a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
		d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
		c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
		b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
		a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
		d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
		c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
		b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
		a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
		d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
		c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
		b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
		a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
		d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
		c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
		b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

		a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
		d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
		c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
		b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
		a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
		d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
		c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
		b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
		a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
		d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
		c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
		b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
		a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
		d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
		c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
		b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

		a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
		d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
		c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
		b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
		a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
		d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
		c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
		b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
		a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
		d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
		c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
		b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
		a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
		d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
		c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
		b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

		a = safe_add(a, olda);
		b = safe_add(b, oldb);
		c = safe_add(c, oldc);
		d = safe_add(d, oldd);
	}
	return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t) {
	return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}

function md5_ff(a, b, c, d, x, s, t) {
	return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function md5_gg(a, b, c, d, x, s, t) {
	return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function md5_hh(a, b, c, d, x, s, t) {
	return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5_ii(a, b, c, d, x, s, t) {
	return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data) {
	var bkey = str2binl(key);
	if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

	var ipad = Array(16), opad = Array(16);
	for (var i = 0; i < 16; i++) {
		ipad[i] = bkey[i] ^ 0x36363636;
		opad[i] = bkey[i] ^ 0x5C5C5C5C;
	}

	var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
	return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
	var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
	return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str) {
	var bin = Array();
	var mask = (1 << chrsz) - 1;
	for (var i = 0; i < str.length * chrsz; i += chrsz)
		bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
	return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin) {
	var str = "";
	var mask = (1 << chrsz) - 1;
	for (var i = 0; i < bin.length * 32; i += chrsz)
		str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
	return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray) {
	var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
	var str = "";
	for (var i = 0; i < binarray.length * 4; i++) {
		str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
			hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
	}
	return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray) {
	var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var str = "";
	for (var i = 0; i < binarray.length * 4; i += 3) {
		var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16)
			| (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8)
			| ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
		for (var j = 0; j < 4; j++) {
			if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
			else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
		}
	}
	return str;
}
~~~

> 封装HTTP请求服务
>
> src/main/resources/static/js/dataService.js

~~~javascript
const APIURL = '/';

window.dataService = {

	//GET
	get: (url, params = {}) => {

		const searchArr = [];

		Object.keys(params).forEach(n => {
			searchArr.push(`${n}=${params[n]}`);
		});

		const searchStr = searchArr.length ? '?' + searchArr.join('&') : '';
		const token = utils.getCookie('token');

		return fetch(APIURL + url + searchStr, {
			method: 'GET',
			headers: {
				token
			}
		}).then(res => {
			return res.json();
		});
	},

	//POST
	post: (url, params = {}) => {

		const formData = new FormData();

		Object.keys(params).forEach(n => {
			formData.append(n, params[n]);
		});

		const token = utils.getCookie('token');

		return fetch(APIURL + url, {
			method: 'POST',
			headers: {
				token
			},
			body: formData
		}).then(res => {
			console.log(res)
			return res.json();
		});
	},

	// 注册
	addUser(params) {
		return this.post('api/user/add', params);
	},

	// 登录
	login(params) {
		return this.post('api/user/login', params);
	},

	// 用户信息
	getUserInfo(params) {
		return this.get('api/user/info', params);
	},

};
~~~

> utils方法

~~~javascript
window.utils = {

	// md5
	generateMd5(userName, password) {
		const salt = "1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik9ol0p@!.";
		const asciStr = userName + salt + password;
		const asciArr = asciStr.split('');
		const asciResult = [];
		asciArr.forEach(n => {
			asciResult.push(n.charCodeAt());
		});
		const ascireusltStr = asciResult.join(salt);
		return hex_md5(ascireusltStr);
	},

	// setCookie
	setCookie(name, value) {
		var time = 2 * 60 * 60 * 1000;
		var exp = new Date();
		exp.setTime(exp.getTime() + time);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	},

	// getCookie
	getCookie(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	}

};
~~~

### 4.2 注册

> src/main/resources/static/regist.html

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
    <title>注册用户</title>
    <!-- 引入样式 -->
    <link rel="stylesheet" href="css/regist.css"/>
    <link rel="stylesheet" href="https://res.wx.qq.com/open/libs/weui/2.1.3/weui.min.css">
    
</head>
<body>
<div class="container">
    <div class="page form_page js_show">
        <div class="weui-form">
            <div class="weui-form__text-area">
                <h2 class="weui-form__title">注册新用户</h2>
            </div>
            <div class="weui-form__control-area">
                <div class="weui-cells__group weui-cells__group_form">
                    <div class="weui-cells weui-cells_form">
                        <div class="weui-cell">
                            <div class="weui-cell__hd"><label class="weui-label">用户名</label></div>
                            <div class="weui-cell__bd">
                                <input id="js_input——user" class="weui-input" placeholder="请输入要设置的用户名">
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd"><label class="weui-label">密码</label></div>
                            <div class="weui-cell__bd">
                                <input id="js_input——pwd" type="password" class="weui-input" placeholder="请输入要设置的密码">
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd"><label class="weui-label">确认密码</label></div>
                            <div class="weui-cell__bd">
                                <input id="js_input——pwd2" type="password" class="weui-input" placeholder="请再次输入设置的密码" type="number" pattern="[0-9]*">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="weui-form__opr-area">
                <a class="weui-btn weui-btn_primary" href="javascript:" id="submit">确定</a>
            </div>

            <div class="weui-form__extra-area">
                <div class="weui-footer">
                    <p class="weui-footer__text">Copyright © 2019 alex wong</p>
                </div>
            </div>
        </div>
        <div id="js_toast" style="display: none;">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-icon-success-no-circle weui-icon_toast"></i>
                <p class="weui-toast__content">已完成</p>
            </div>
        </div>
    </div>
</div>
</body>
<script src="js/md5.js"></script>
<script src="js/utils.js"></script>
<script src="js/dataService.js"></script>
<script type="text/javascript" src="https://res.wx.qq.com/open/libs/weuijs/1.2.1/weui.min.js"></script>
<script src="js/regist.js"></script>
</html>
~~~

> src/main/resources/static/js/regist.js

~~~javascript
// 获取相关用户信息
const userNameInput = document.getElementById("js_input——user");
const passwordInput = document.getElementById("js_input——pwd");
const passwordConfirmInput = document.getElementById("js_input——pwd2");
const submitBtn = document.getElementById("submit");

// submit
submitBtn.onclick = () => {

	const userName = userNameInput.value;
	const password = passwordInput.value;
	const confirmPassword = passwordConfirmInput.value;

	// verify
	if (!userName) {
		weui.topTips('用户姓名不能为空');
		return;
	} else if (!password) {
		weui.topTips('用户密码不能为空');
		return;
	} else if (confirmPassword !== password) {
		weui.topTips('前后密码不一致，请重试');
		return;
	}

	// 加密密码
	const newPassword = utils.generateMd5(userName, password);

	// 注册
	dataService.addUser({
		userName,
		password: newPassword,
	}).then(res => {
		const {code, data, message} = res;
		debugger
		if (code != 200) {
			weui.topTips(message);
		} else {
			weui.topTips(`注册成功，欢迎`);
			window.location.href = location.origin + '/login.html';
		}
	})
};
~~~

![image-20200725083432836](assets/image-20200725083432836.png)

### 4.3 登录

> src/main/resources/static/login.html

~~~javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
  <title>login</title>
  <!-- 引入样式 -->
  <link rel="stylesheet" href="css/regist.css"/>
  <link rel="stylesheet" href="https://res.wx.qq.com/open/libs/weui/2.1.3/weui.min.css">

</head>
<body>
<div class="container">
  <div class="page form_page js_show">
    <div class="weui-form">
      <div class="weui-form__text-area">
        <h2 class="weui-form__title">登录</h2>
      </div>
      <div class="weui-form__control-area">
        <div class="weui-cells__group weui-cells__group_form">
          <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
              <div class="weui-cell__hd"><label class="weui-label">用户名</label></div>
              <div class="weui-cell__bd">
                <input id="js_input——user" class="weui-input" placeholder="请输入用户名">
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd"><label class="weui-label">密码</label></div>
              <div class="weui-cell__bd">
                <input id="js_input——pwd" type="password" class="weui-input" placeholder="请输入密码">
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
              <div class="weui-cell__bd">
                <input id="js_input——code" type="text" class="weui-input" placeholder="请输入验证码">
                <img onclick="refreshCode()" class="captchaCode" src="/api/v1/user/getCaptchaImage" />
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="weui-form__opr-area">
        <a class="weui-btn weui-btn_primary" href="javascript:" id="submit">确定</a>
      </div>

      <div class="weui-form__extra-area">
        <div class="weui-footer">
          <p class="weui-footer__text">Copyright © 2020 alex wong</p>
        </div>
      </div>
    </div>
    <div id="js_toast" style="display: none;">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">已完成</p>
      </div>
    </div>
  </div>
</div>
</body>
<script src="js/md5.js"></script>
<script src="js/utils.js"></script>
<script src="js/dataService.js"></script>
<script type="text/javascript" src="https://res.wx.qq.com/open/libs/weuijs/1.2.1/weui.min.js"></script>
<script src="js/login.js"></script>
</html>
~~~

> src/main/resources/static/js/login.js

~~~javascript
// 获取相关用户信息
const userNameInput = document.getElementById("js_input——user");
const passwordInput = document.getElementById("js_input——pwd");
const codeInput = document.getElementById("js_input——code");
const submitBtn = document.getElementById("submit");

// submit
submitBtn.onclick = () => {

	const userName = userNameInput.value;
	const password = passwordInput.value;
	const code = codeInput.value;

	// verify
	if (!userName) {
		weui.topTips('用户姓名不能为空');
		return;
	} else if (!password) {
		weui.topTips('用户密码不能为空');
		return;
	} else if (!code) {
		weui.topTips('验证码不能为空');
		return;
	}

	// 加密密码
	const newPassword = utils.generateMd5(userName, password);

	// 注册
	dataService.login({
		userName,
		password: newPassword,
		code,
	}).then(res => {
		const { code, data, message} = res;

		if (code != 200) {
			weui.topTips(message);
		} else {
			weui.topTips(`登录成功，欢迎`);
			utils.setCookie('token', data.token);
			location.href = location.origin + '/home.html';
		}
	})
};

// 刷新code
const refreshCode = ()=>{
	let codeNode = document.querySelector(".captchaCode");
	codeInput.value = '';
	codeNode.src = '';
	codeNode.src = '/api/v1/user/getCaptchaImage';
};
~~~

![image-20200725190813414](assets/image-20200725190813414.png)

## 5 token验证逻辑

在常规的业务开发中，切记不可把接口服务暴露给任何人都可以访问，不然别人可以任意查看或者修改你的数据，这是很严重的事情。除了常规从网段IP方面限制固定客户端IP的范围，接口本身也要增加安全验证，这个时候我们就需要用到之前生成的用户凭证token;

问题是我们如果自定义控制，哪些接口是需要经过验证，哪些接口是不需要通过验证的呢？有人可能会说，直接全部验证不就可以了，何苦纠结。但是在真实的业务中，有些接口是不能强制校验的，比如一些用户分享到微信的那种接口，是不能增加验证，否则分享的页面无法正常显示。

所以我们可以自定义注解@PassToken, 添加这个注解的接口，就可以不用进行token验证了。

![image-20200725193401676](assets/image-20200725193401676.png)

> 拦截器
>
> com.scaffold.test.config.interceptor.AuthenticationInterceptor

~~~java
package com.scaffold.test.config.interceptor;

import com.alibaba.fastjson.JSONObject;
import com.scaffold.test.base.Result;
import com.scaffold.test.base.ResultCode;
import com.scaffold.test.base.ResultGenerator;
import com.scaffold.test.config.annotation.PassToken;
import com.scaffold.test.entity.User;
import com.scaffold.test.service.UserService;
import com.scaffold.test.utils.BaseUtils;
import com.scaffold.test.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;

/**
 * 拦截器
 * @author alex
 */

public class AuthenticationInterceptor implements HandlerInterceptor {

    @Autowired
    UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        // token
        String token = BaseUtils.getToken();

        // 如果不是响应方法，静态资源直接放行
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }

        // 带 @PassToken 注解放行
        HandlerMethod handlerMethod = (HandlerMethod) handler;
        Method method = handlerMethod.getMethod();
        if(method.isAnnotationPresent(PassToken.class)){
            PassToken annotation = method.getAnnotation(PassToken.class);
            if(annotation.required()){
                return true;
            }
        }

        // 设置响应格式
        response.setContentType("application/json;charset=UTF-8");

        // 验证token非空
        if (token == null || token.equals("null")) {
            Result result = ResultGenerator.setFailResult(ResultCode.UNAUTHORIZED, "无token,请重新登录");
            response.getWriter().write(getJSONObject(result));
            return false;
        }

        // 验证TOKEN有效
        String currentUserId = BaseUtils.getCurrentUserId();
        if(currentUserId == null || currentUserId.equals("null")){
            Result result = ResultGenerator.setFailResult(ResultCode.UNAUTHORIZED, "访问异常，token不正确,请重新登录");
            response.getWriter().write(getJSONObject(result));
            return false;
        }

        // 验证用户是否存在
        User userQuery = new User();
        userQuery.setUserId(currentUserId);
        User user = userService.findUser(userQuery);
        if(user == null){
            Result result = ResultGenerator.setFailResult(ResultCode.UNAUTHORIZED, "用户不存在，token不正确,请重新登录");
            response.getWriter().write(getJSONObject(result));
            return false;
        }

        //jwt再次校验
        Boolean verify = JWTUtils.verify(token, user);
        if(!verify){
            Result result = ResultGenerator.setFailResult(ResultCode.UNAUTHORIZED, "非法访问,请重新登录");
            response.getWriter().write(getJSONObject(result));
            return false;
        }

        return true;
    }


    // 响应结果转化格式
    private static String getJSONObject(Result result) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("code", result.getCode());
        jsonObject.put("message", result.getMessage());
        return jsonObject.toJSONString();
    }
}

~~~

> 开启拦截器
>
> com.scaffold.test.config.WebMvcConfig

~~~java
package com.scaffold.test.config;

import com.alibaba.fastjson.JSON;
import com.scaffold.test.base.Result;
import com.scaffold.test.base.ResultCode;
import com.scaffold.test.base.ServiceException;
import com.scaffold.test.config.interceptor.AuthenticationInterceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * @author alex
 */

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final Logger logger = LoggerFactory.getLogger(WebMvcConfigurer.class);

    /**
     * 统一异常处理
     * @param exceptionResolvers
     */
    @Override
    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> exceptionResolvers) {
        exceptionResolvers.add((request, response, handler, e) -> {
            Result result = new Result();
            // 异常处理
            if (e instanceof ServiceException) {
                // 1、业务失败的异常，如“账号或密码错误”
                result.setCode(ResultCode.FAIL).setMessage(e.getMessage());
                logger.info(e.getMessage());
            }else if (e instanceof ServletException) {
                // 2、调用失败
                result.setCode(ResultCode.FAIL).setMessage(e.getMessage());
            } else {
                // 3、内部其他错误
                result.setCode(ResultCode.INTERNAL_SERVER_ERROR).setMessage("接口 [" + request.getRequestURI() + "] 内部错误，请联系管理员");
                String message;
                if (handler instanceof HandlerMethod) {
                    HandlerMethod handlerMethod = (HandlerMethod) handler;
                    message = String.format("接口 [%s] 出现异常，方法：%s.%s，异常摘要：%s",
                            request.getRequestURI(),
                            handlerMethod.getBean().getClass().getName(),
                            handlerMethod.getMethod().getName(),
                            e.getMessage());
                } else {
                    message = e.getMessage();
                }
                result.setMessage(message);
                logger.error(message, e);
            }
            responseResult(response, result);
            return new ModelAndView();
        });
    }

    // 处理响应数据格式
    private void responseResult(HttpServletResponse response, Result result) {
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        response.setStatus(200);
        try {
            response.getWriter().write(JSON.toJSONString(result));
        } catch (IOException ex) {
            logger.error(ex.getMessage());
        }
    }

    // 增加拦截器
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authenticationInterceptor()).addPathPatterns("/api/**");
        WebMvcConfigurer.super.addInterceptors(registry);
    }

    // 开启拦截器
    @Bean
    public AuthenticationInterceptor authenticationInterceptor() {
        return new AuthenticationInterceptor();
    }

}

~~~

> 跳过Token验证
>
> com.scaffold.test.config.annotation.PassToken

~~~java
package com.scaffold.test.config.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 是否跳过token验证
 * @author alex
 */

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface PassToken {
    boolean required() default true;
}

~~~

![image-20200725195803978](assets/image-20200725195803978.png)

![image-20200725201821559](assets/image-20200725201821559.png)

> 调用其他接口时，token加在请求头里面

![image-20200725201940596](assets/image-20200725201940596.png)

然后通过拦截器判定token权限；如果加了@PassToken 注解就会越过拦截器

~~~java
// 带 @PassToken 注解放行
HandlerMethod handlerMethod = (HandlerMethod) handler;
Method method = handlerMethod.getMethod();
	if(method.isAnnotationPresent(PassToken.class)){
		PassToken annotation = method.getAnnotation(PassToken.class);
		if(annotation.required()){
			return true;
	}
}
~~~

> 拦截器流程设计
>
> 1、判断是否HTTP请求，静态资源直接放行
>
> 2、带 @PassToken 注解放行
>
> 3、验证token非空
>
> 4、验证TOKEN有效
>
> 5、验证用户是否存在

## 6 总结

以上就是全部内容。有些部分内容，在之前的教程中有讲过，这里不再赘述，感兴趣的同学可以看之前的教程。

