package com.zz.service;

import com.zz.entity.Student;
import com.zz.query.StudentQuery;

import java.util.List;

public interface StudentService {
    // insert
    int insert(StudentQuery query);
    
    // findAll
    List<Student> findAll();
    
    // findByName
    Student findByName(String name);
}
