package com.zz.newController;

import com.zz.service.StudentService;
import com.zz.model.Response;
import com.zz.query.StudentQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/student")
public class StudentController {
    
    @Autowired
    private StudentService studentService;
    
    @PostMapping("/insert")
    public Response insertStudent(@RequestParam String name, @RequestParam Integer age, Response response){
        StudentQuery query = new StudentQuery();
        query.setName(name);
        query.setAge(age);
        studentService.insert(query);
        response.setData(0);
        response.setMsg("insert success");
        return response;
    }
}
