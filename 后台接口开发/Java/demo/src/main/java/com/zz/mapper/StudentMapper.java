package com.zz.mapper;

import com.zz.query.StudentQuery;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

@Mapper
public interface StudentMapper {
    void insert(StudentQuery query);
}
