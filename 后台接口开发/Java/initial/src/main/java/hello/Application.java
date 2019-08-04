package hello;

import com.terran4j.commons.api2doc.config.EnableApi2Doc;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@EnableApi2Doc
@RestController
@SpringBootApplication
public class Application {
    @RequestMapping("")
    String home(){
        return "Hello World!";
    }
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

/*
* 端口被占用
* sudo lsof -i :8080
 */
