package com.zz.service.impl;

import com.zz.entity.User;
import com.zz.mapper.UserMapper;
import com.zz.query.UserQuery;
import com.zz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserMapper userMapper;
    
    @Override
    public int addUser(UserQuery query){
        return this.userMapper.insert(query);
    }
    
    @Override
    public User findUserById(UserQuery query) {
        return this.userMapper.findUserById(query);
    }
    
    @Override
    public User findUserByName(UserQuery query) {
        return this.userMapper.findUserByName(query);
    }
    
    @Override
    public List<User> findAllUser(UserQuery query) {
        return this.userMapper.findAllUser(query);
    }
}
