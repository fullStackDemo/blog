package com.zz;


import com.zz.config.MyConfiguration;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;


@SpringBootApplication
@ComponentScan("com.zz.*")
@MapperScan("com.zz.mapper")
public class Application {
    
    @Autowired
    private MyConfiguration myConfiguration;
    
    @GetMapping("/")
    String home() {
        String tokenUrl = myConfiguration.getTokenURL();
        return tokenUrl;
    }
    
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

/*
 * 端口被占用
 * sudo lsof -i :8080
 */
