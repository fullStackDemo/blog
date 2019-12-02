package com.zz.mapper;

import com.zz.entity.User;
import com.zz.query.UserQuery;

import java.util.List;

public interface UserMapper {
    
    int insert(UserQuery query);
    
    User findUserById(UserQuery query);
    
    User findUserByName(UserQuery query);
    
    List<User> findAllUser(UserQuery query);
    
}
