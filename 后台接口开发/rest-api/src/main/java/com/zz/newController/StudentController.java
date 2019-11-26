package com.zz.newController;

import com.zz.entity.Student;
import com.zz.model.Response;
import com.zz.query.StudentQuery;
import com.zz.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        this.studentService.insert(query);
        response.setData(0);
        response.setMsg("insert success");
        return response;
    }

    @GetMapping("/list")
    public Response findAllStudent(Response response){
        List<Student> list;
        list = this.studentService.findAll();
        response.setMsg("success");
        response.setData(list);
        return response;
    }
}
