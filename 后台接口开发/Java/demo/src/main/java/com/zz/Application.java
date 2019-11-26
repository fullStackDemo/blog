package com.zz;

import com.terran4j.commons.api2doc.config.EnableApi2Doc;
import com.zz.config.MyConfiguration;
import org.mybatis.spring.annotation.MapperScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.*;

@EnableApi2Doc
@RestController
@SpringBootApplication
@ComponentScan("com.zz.*")
@Configuration
@MapperScan("com.zz.mapper")
public class Application {
    
    private static final Logger log = LoggerFactory.getLogger(Application.class);
    
    @Autowired
    private MyConfiguration myConfiguration;
    
    @GetMapping("/")
    String home() {
        String tokenUrl = myConfiguration.getTokenURL();
        log.info(tokenUrl);
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
