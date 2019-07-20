package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/mysql")
public class MysqlTestController {
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping("/add")
    @ResponseBody
    public String addNewUser(@RequestParam String name, @RequestParam String email) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        userRepository.save(user);
        return "saved";
    }
    
    @GetMapping("/all")
    @ResponseBody
    public Iterable<User> getAllUsers(){
        // This returns a JSON or XML with the users
        return  userRepository.findAll();
    }
}
