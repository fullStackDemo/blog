package hello;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Set;

@RestController
public class TestController {
    
    @GetMapping("/student")
    @ResponseBody
    public Set getStudent() {
        Set set = new HashSet<>();
        Object object = new Object();
        set.add(object);
        return set;
    }
}
