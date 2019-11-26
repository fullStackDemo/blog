package com.zz.mapper;

import com.zz.query.StudentQuery;
import org.apache.ibatis.annotations.Mapper;

public interface StudentMapper {
    public int insert(StudentQuery query);
}
