package com.zz.service.impl;

import com.zz.service.StudentService;
import com.zz.entity.Student;
import com.zz.query.StudentQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {
    
    @Override
    public void insert(StudentQuery query) {
//        studentService.insert(query);
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
