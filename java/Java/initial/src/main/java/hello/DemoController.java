package hello;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {
    
    @RequestMapping("api/demo")
    public Demo demo(@RequestParam(value = "cont", defaultValue = "123456") String cont){
        return new Demo(88, cont);
    }
}
