package com.zz.service;

import com.zz.entity.Student;
import com.zz.query.StudentQuery;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

public interface StudentService {
    // insert
    void insert(StudentQuery query);
    
    // findAll
    List<Student> findAll(String name);
    
    // findByName
    Student findByName(String name);
}
