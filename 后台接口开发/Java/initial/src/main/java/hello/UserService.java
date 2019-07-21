package hello;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.transaction.Transactional;

@Service
public class UserService {
    
    @Resource
    private UserRepository userRepository;
    
    /*
     * save, update,delete 方法需要绑定事务. 使用@Transactional进行事务的绑定.
     * @param User
     * 保存对象
     */
    @Transactional
    public void save(User user) {
        userRepository.save(user);
    }
    
    /*
     *  根据 id 删除对象
     *  @params id
     */
    @Transactional
    public void delete(int id) {
        userRepository.deleteById(id);
    }
    
    /*
     * find all
     * @return
     * */
    @Transactional
    public Iterable<User> getAll() {
        return userRepository.findAll();
    }
    
    /*
    * update
    *
    * */
    @Transactional
    public void update(User user){
        userRepository.save(user);
    }
    
    /*
    * findOneById
    * @return
    * */
    @Transactional
    public Object findOneByName(int id){
        return userRepository.findById(id);
    }
    
    
    
}
