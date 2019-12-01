package com.zz.common;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.zz.entity.User;
import com.zz.utils.HttpUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

public class BaseApplicationController {
    
    
    // 获取所有请求头数据
    public static Map<String, Object> getHeader() {
        
        HttpServletRequest request = HttpUtils.getRequest();
        
        Map<String, Object> headerInfo = new HashMap<>();
        
        // 获取所有请求头里面的key
        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String key = headerNames.nextElement();
            String value = request.getHeader(key);
            headerInfo.put(key, value);
        }
        
        return headerInfo;
    }
    
    // getToken
    public static String getToken() {
        Map<String, Object> headerData = BaseApplicationController.getHeader();
        return (String) headerData.get("token");
    }
    
    // 获取用户信息
    public static User getCurrentUser() {
        User userData = new User();
        String token = BaseApplicationController.getToken();
        if (token != null && !token.equals("null")) {
            DecodedJWT claims = JWT.decode(token);
            userData.setUserName(claims.getClaim("userName").asString());
            userData.setUserId(claims.getClaim("userId").asLong());
        }
        return userData;
    }
}
