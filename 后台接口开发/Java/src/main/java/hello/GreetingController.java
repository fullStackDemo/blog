package hello;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {
  
  
  @RequestMapping("/greet")
  public Greeting greeting() {
    return new Greeting(1, "2");
  }
  
}
