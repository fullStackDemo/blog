package com.zz.service.impl;

import com.zz.entity.Student;
import com.zz.mapper.StudentMapper;
import com.zz.query.StudentQuery;
import com.zz.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {
    
    @Autowired
    private StudentMapper studentMapper;
    
    @Override
    public void insert(StudentQuery query) {
        studentMapper.insert(query);
    }
    
    @Override
    public List<Student> findAll(String name) {
        return null;
    }
    
    @Override
    public Student findByName(String name) {
        return null;
    }
}
