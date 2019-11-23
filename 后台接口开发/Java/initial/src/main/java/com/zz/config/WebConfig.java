package com.zz.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static com.zz.config.ConfigConstants.getFileDir;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    private final static Logger logger = LoggerFactory.getLogger(WebConfig.class);
    
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/greet").allowedOrigins("http://localhost:9000");
//    }
    
    private String fileDir = getFileDir();
    
    
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        logger.info("========file:" + getFileDir());
//        logger.info("Add resource locations: {}", fileDir);
//        registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
//        registry.addResourceHandler("/file/**").addResourceLocations("classpath:/file/");
//    }
    
}
