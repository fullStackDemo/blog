package com.zz.controllers;

import com.terran4j.commons.api2doc.annotations.Api2Doc;
import com.terran4j.commons.api2doc.annotations.ApiComment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Api2Doc(name = "TEST接口", order = 2)
@RestController
public class DemoController {
    
    @ApiComment("demo")
    @GetMapping("api/demo")
    public Demo demo(@RequestParam(value = "cont", defaultValue = "123456") String cont){
        return new Demo(88, cont);
    }
}
