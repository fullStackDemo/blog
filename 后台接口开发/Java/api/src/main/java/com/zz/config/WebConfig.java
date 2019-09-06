package com.zz.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static com.zz.config.ConfigConstants.getFileDir;

public class WebConfig implements WebMvcConfigurer {

    private final static Logger LOGGER = LoggerFactory.getLogger(WebConfig.class);

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/greet").allowedOrigins("http://localhost:9000");
    }

    private String fileDir = getFileDir();

    // static resource
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        LOGGER.info("Add resource locations: {}", fileDir);
        registry.addResourceHandler("/**")
                .addResourceLocations(
                        "classpath:/static/",
                        "file:" + fileDir
                );
    }

}
