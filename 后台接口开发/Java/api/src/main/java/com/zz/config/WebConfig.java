package com.zz.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static com.zz.config.ConfigConstants.getFileDir;

import java.io.File;


public class WebConfig implements WebMvcConfigurer {

	private final static Logger LOGGER = LoggerFactory.getLogger(WebConfig.class);

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/greet").allowedOrigins("http://localhost:9000");
	}

	// static resource
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		String fileDir = getFileDir();
		LOGGER.info("============Add resource locations: {}=======", fileDir);
		registry.addResourceHandler("/**").addResourceLocations("classpath:/resources/", "classpath:/static/",
				"file:" + fileDir + File.separator);
		registry.addResourceHandler("/file/**").addResourceLocations("file:/file");
	}

}
