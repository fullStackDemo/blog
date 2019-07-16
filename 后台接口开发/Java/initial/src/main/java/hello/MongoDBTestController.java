package hello;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Controller
public class MongoDBTestController {
    
    @Autowired
    MongoTemplate mongoTemplate;
    
    // 插入对象
    @GetMapping("/addPerson")
    @ResponseBody
    public String addPerson(@RequestParam(value = "name", defaultValue = "test") String name) {
        Person person = new Person();
        person.setFirstName(name);
        person.setLastName(name);
        mongoTemplate.insert(person);
        List<Person> personList = new LinkedList<>();
        personList.add(person);
        return Utils.toJSON(0, 0, personList);
    }
    
    // 查询对象
    @GetMapping("/getPerson")
    @ResponseBody
    public String getPerson(@RequestParam(value = "name", defaultValue = "") String name) {
        Criteria criteria = where("firstName").in(name);
        List<Person> personList = mongoTemplate.find(query(criteria), Person.class);
        if (personList.size() > 0) {
            return Utils.toJSON(0, 0, personList);
        } else {
            return Utils.toJSON(0, 1001, personList);
        }
    }
    
    
}
