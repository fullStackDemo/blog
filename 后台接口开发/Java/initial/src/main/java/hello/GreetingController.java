package hello;


import com.terran4j.commons.api2doc.annotations.Api2Doc;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api2Doc(name = "TEST类")
@RestController
public class GreetingController {
  
  @CrossOrigin(origins = "http://localhost:9000")
  @RequestMapping("/greet")
  public Greeting greeting() {
    return new Greeting(1, "2");
  }
  
}
