package com.zz;

import com.terran4j.commons.api2doc.config.EnableApi2Doc;
import com.zz.storage.StorageProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;

import com.zz.config.ConfigConstants;


@EnableApi2Doc
@RestController
@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class Application {
    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Value("${web.uploadDir}")
    String demo;

    @RequestMapping("/")
    String home() {
        log.info("99999" + demo);
        log.info(ConfigConstants.fileDir);
        return "redirect:/static/index.html";
    }


    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

/*
 * 端口被占用
 * sudo lsof -i :8080
 */
