package com.zz.mapper;

import com.zz.entity.Student;
import com.zz.query.StudentQuery;

import java.util.List;

public interface StudentMapper {

    List<Student> findAll();

    public int insert(StudentQuery query);
    
}
