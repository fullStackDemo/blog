package com.zz.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    private final static Logger logger = LoggerFactory.getLogger(WebConfig.class);
    
    
    
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/file/**").addResourceLocations("classpath:/file/");
//    }
    
}
