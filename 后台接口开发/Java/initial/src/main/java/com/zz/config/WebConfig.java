package com.zz.config;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/greet").allowedOrigins("http://localhost:9000");
    }

    private String fileDir = "F:\\project\\blog\\后台接口开发\\Java\\initial\\src\\main\\file";

    // static resource
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations(
                        "classpath:/static/**",
                        "file:" + fileDir
                );
    }

}
