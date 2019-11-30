package com.zz.newController;

import com.zz.model.Response;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 登录
 * autho: wangzhao
 */
@RestController
@RequestMapping("/user")
public class LoginController {
    
    // 注册
    @PostMapping("add")
    public Response addUser() {
        
        return null;
    }
}
