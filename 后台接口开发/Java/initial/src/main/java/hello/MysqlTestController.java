package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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
    public Map getAllUsers() {
        // This returns a JSON or XML with the users
        Iterable results = userRepository.findAll();
        System.out.println(results);
        ArrayList<User> arrayList = new ArrayList<User>();
        for (Object user : results) {
            User currentUser = (User) user;
            arrayList.add(currentUser);
        }
        Map result = new HashMap();
        result.put("code", 0);
        result.put("data", arrayList);
        return result;
    }
    
    //  find user
    @GetMapping("/find")
    @ResponseBody
    public Object getUser(@RequestParam Integer id) {
        System.out.println(id);
        Map result = new HashMap();
        result.put("code", 0);
        if (id == null) {
            result.put("message", "缺少id");
            return result;
        }
        User user = userRepository.findById(id).get();
        result.put("data", user);
        return result;
    }
    
    //  update user
    @GetMapping("/update")
    @ResponseBody
    public Object updateUser(@RequestParam int id, @RequestParam String name, @RequestParam String email) {
        System.out.println(id);
        Map result = new HashMap();
        result.put("code", 0);
        Optional _user = userRepository.findById(id);
        if (_user.isPresent()) {
            User user = (User) _user.get();
            user.setName(name);
            user.setEmail(email);
            result.put("data", user);
            result.put("message", "update successfull");
            userRepository.save(user);
        }
        return result;
    }
    
    // error
    @GetMapping("/error")
    @ResponseBody
    public Exception error(Exception err) {
        return err;
    }
    
    
    // find by name contains some character
    @GetMapping("/search")
    @ResponseBody
    public Iterable findByName(String name) {
//        Iterable result = userRepository.findByNameContaining(name);
        Iterable<User> result = userRepository.search(name);
        return result;
//        if (result.iterator().hasNext()) {
//            return result;
//        } else {
//            result = userRepository.findByEmailContains(name);
//            return result;
//        }
    }
}
