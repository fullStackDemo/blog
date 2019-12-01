package com.zz.newController;

import com.zz.entity.User;
import com.zz.model.Response;
import com.zz.query.UserQuery;
import com.zz.service.UserService;
import com.zz.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


/**
 * 登录
 * autho: wangzhao
 */
@RestController
@RequestMapping("/user")
public class LoginController {
    
    @Autowired
    private UserService userService;
    
    /*
     * @param userName
     * @param password
     * @return response
     */
    @PostMapping("/add")
    public Response addUser(@RequestParam String userName, @RequestParam String password, Response response) {
        UserQuery query = new UserQuery();
        User userData = null;
        
        query.setUserName(userName);
        query.setPassword(password);
        
        int result;
        String message = "";
        
        // 判断用户是否已经存在
        UserQuery findUserQuery = new UserQuery();
        findUserQuery.setUserName(userName);
        User existUser = this.userService.findUserByName(findUserQuery);
        if (existUser == null) {
            
            // 插入用户
            try {
                result = this.userService.addUser(query);
                message = "success";
            } catch (Exception e) {
                result = 0;
                message = "error";
                e.printStackTrace();
            }
            
            // 插入用户成功后返回用户信息
            if (result == 1) {
                userData = this.userService.findUserByName(findUserQuery);
                
                // 生成token
                String token = null;
                
                // 当前用户
                User currentUser = new User();
                if (userData != null) {
                    currentUser.setUserId(userData.getUserId());
                    currentUser.setUserName(userData.getUserName());
                    currentUser.setPassword(password);
                    token = JWTUtils.createToken(currentUser);
                }
                
                if (token != null) {
                    userData.setToken(token);
                    
                    // 获取token用户信息
                    // Claims userDataFromToken = JWTUtils.parseToken(token, currentUser);
                }
            }
            
        } else {
            message = "用户已经存在";
        }
        
        response.setData(userData);
        response.setMsg(message);
        return response;
    }
    
    /**
     * 登录
     *
     * @param userName 用户名
     * @param password 密码
     * @return {}
     */
    @PostMapping("/login")
    public Response login(@RequestParam String userName, @RequestParam String password, Response response) {
        
        UserQuery query = new UserQuery();
        query.setUserName(userName);
        query.setPassword(password);
        
        User userData = new User();
        
        // 验证用户和密码
        try {
            // 判断用户是否已经存在
            User existUser = this.userService.findUserByName(query);
            
            // 生成token
            String token = null;
            
            // 当前用户
            User currentUser = new User();
            if (existUser != null) {
                currentUser.setUserId(existUser.getUserId());
                currentUser.setUserName(existUser.getUserName());
                currentUser.setPassword(password);
                token = JWTUtils.createToken(currentUser);
                if (token != null) {
                    existUser.setToken(token);
                }
                response.setMsg("success");
                response.setData(existUser);
            } else {
                // 登录失败
                response.setMsg("登录失败，请检查用户名和密码");
                response.setData(null);
            }
            
        } catch (Exception e) {
            response.setMsg("login failed");
            response.setData(null);
            e.printStackTrace();
        }
        return response;
    }
}
