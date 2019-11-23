package com.zz;

import com.terran4j.commons.api2doc.config.EnableApi2Doc;
import com.zz.config.MyConfiguration;
import com.zz.storage.StorageProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.*;

import java.util.Properties;

@EnableApi2Doc
@RestController
@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
@ComponentScan("com.zz.*")
@Configuration
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
        Properties properties = System.getProperties();
        System.out.println("======== " + properties.get("user.dir"));
        SpringApplication.run(Application.class, args);
    }
}

/*
 * 端口被占用
 * sudo lsof -i :8080
 */
