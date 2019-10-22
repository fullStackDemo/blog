package com.zz;

import com.terran4j.commons.api2doc.config.EnableApi2Doc;
import com.zz.storage.StorageProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.util.Properties;

import com.zz.config.ConfigConstants;


//@EnableApi2Doc
@RestController
//@SpringBootApplication
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class, HibernateJpaAutoConfiguration.class})
@EnableConfigurationProperties(StorageProperties.class)
@ComponentScan("com.zz.*")
public class Application {
    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @RequestMapping("/")
    String home() {
        log.info("99999");
        log.info(ConfigConstants.fileDir);
        return "redirect:/list.html";
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
