package com.zz;

import com.terran4j.commons.api2doc.config.EnableApi2Doc;
import com.zz.storage.StorageProperties;
import com.zz.storage.StorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceView;
import org.springframework.web.servlet.view.UrlBasedViewResolver;


@EnableApi2Doc
@RestController
@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class Application {
    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @RequestMapping("/")
    String home() {
        log.info("99999");
//        return "Hello World!";
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
