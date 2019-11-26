package com.zz.service.impl;

import com.zz.entity.Student;
import com.zz.mapper.StudentMapper;
import com.zz.query.StudentQuery;
import com.zz.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("StudentService")
public class StudentServiceImpl implements StudentService {
    
    @Autowired
    private StudentMapper studentMapper;
    
    @Override
    @Transactional
    public int insert(StudentQuery query) {
        return studentMapper.insert(query);
    }
    
    @Override
    public List<Student> findAll() {
        return studentMapper.findAll();
    }
    
    @Override
    public Student findByName(String name) {
        return null;
    }
}
