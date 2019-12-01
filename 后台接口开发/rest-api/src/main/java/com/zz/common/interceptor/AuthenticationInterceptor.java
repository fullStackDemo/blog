package com.zz.common.interceptor;

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.mongodb.util.JSON;
import com.zz.common.annotation.PassToken;
import com.zz.common.base.BaseApplicationController;
import com.zz.entity.User;
import com.zz.model.Response;
import com.zz.query.UserQuery;
import com.zz.service.UserService;
import com.zz.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;

// 拦截器
public class AuthenticationInterceptor implements HandlerInterceptor {
    
    @Autowired
    private UserService userService;
    
    /**
     * response返回信息
     *
     * @param code
     * @param message
     * @return
     * @throws JSONException
     */
    public JSONObject getJsonObject(int code, String message) throws JSONException {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("msg", message);
        jsonObject.put("code", code);
        return jsonObject;
    }
    
    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object object) throws Exception {
        
        // 从 http 请求头中取出 token
        String token = BaseApplicationController.getToken();
        // 如果不是映射到方法直接通过
        if (!(object instanceof HandlerMethod)) {
            return true;
        }
        
        HandlerMethod handlerMethod = (HandlerMethod) object;
        Method method = handlerMethod.getMethod();
        //检查是否有PassToken注释，有则跳过认证
        if (method.isAnnotationPresent(PassToken.class)) {
            PassToken passToken = method.getAnnotation(PassToken.class);
            if (passToken.required()) {
                return true;
            }
        }
        
        // 默认执行认证
        httpServletResponse.setContentType("application/json;charset=UTF-8");
        if (token == null || token.equals("null")) {
            JSONObject jsonObject = getJsonObject(403, "无token，请重新登录");
            httpServletResponse.getWriter().write(jsonObject.toString());
            return false;
            // throw new RuntimeException("无token，请重新登录");
        }
        
        // 获取 token 中的 user id
        long userId;
        try {
            userId = BaseApplicationController.getCurrentUserId();
        } catch (JWTDecodeException j) {
            JSONObject jsonObject = getJsonObject(500, "访问异常, token不正确，请重新登录");
            httpServletResponse.getWriter().write(jsonObject.toString());
            return false;
            // throw new RuntimeException("访问异常！");
        }
        
        // 验证用户是否存在
        UserQuery query = new UserQuery();
        query.setUserId(userId);
        query.setShowPassword(Boolean.TRUE);
        User user = userService.findUserById(query);
        
        if (user == null) {
            JSONObject jsonObject = getJsonObject(500, "用户不存在，请重新登录");
            httpServletResponse.getWriter().write(jsonObject.toString());
            return false;
            // throw new RuntimeException("用户不存在，请重新登录");
        }
        
        // 验证token是否有效
        Boolean verify = JWTUtils.verify(token, user);
        if (!verify) {
            JSONObject jsonObject = getJsonObject(500, "非法访问，请重新登录");
            httpServletResponse.getWriter().write(jsonObject.toString());
            return false;
            // throw new RuntimeException("非法访问！");
        }
        
        return true;
    }
}
