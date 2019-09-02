package hello;

import com.terran4j.commons.api2doc.config.EnableApi2Doc;
import hello.storage.StorageProperties;
import hello.storage.StorageService;
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


@EnableApi2Doc
@RestController
@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class Application {
    private static final Logger log = LoggerFactory.getLogger(Application.class);
    
    @RequestMapping("/")
    String home() {
        log.info("99999");
        return "Hello World!";
    }
    
    public WebMvcConfigurer corsConfig() {
        return new WebMvcConfigurer() {
            // global CORS 跨域请求
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/greet").allowedOrigins("http://localhost:9000");
            }
            
            // static resource
            @Override
            public void addResourceHandlers(ResourceHandlerRegistry registry) {
                registry.addResourceHandler("/**").addResourceLocations("/static/**");
            }
        };
    }
    
    
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
    
    CommandLineRunner init(StorageService storageService){
        return (args) -> {
            log.info("storageService");
            storageService.deleteAll();
            storageService.init();
        };
    }
}

/*
 * 端口被占用
 * sudo lsof -i :8080
 */
