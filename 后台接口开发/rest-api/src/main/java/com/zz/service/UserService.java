package com.zz.service;

import com.zz.entity.User;
import com.zz.query.UserQuery;

import java.util.List;

public interface UserService {
    
    // 添加用户
    int addUser(UserQuery query);
    
    //查找单个用户
    User findUserById(UserQuery query);
    
    User findUserByName(UserQuery query);
    
    List<User> findAllUser(UserQuery query);
    
}
