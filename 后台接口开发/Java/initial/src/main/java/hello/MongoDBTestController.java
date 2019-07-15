package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
public class MongoDBTestController {
    @Autowired
    MongoTemplate mongoTemplate;
    
    //  insert person
    @GetMapping("/addPerson")
    @ResponseBody
    public String addPerson(@RequestParam(value = "name", defaultValue = "test") String name) {
        Person person = new Person();
        person.setFirstName(name);
        person.setLastName(name);
        mongoTemplate.insert(person);
        return "success";
    }
    


}
