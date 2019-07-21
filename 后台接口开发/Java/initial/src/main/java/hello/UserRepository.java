package hello;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

// CRUD refers Create, Read, Update, Delete
public interface UserRepository extends CrudRepository<User, Integer> {
    
    List<User> findUserByName(String name);
    
    List<User> findByNameContaining(String name);
    
    List<User> findByEmailContains(String name);
    
    @Query("SELECT u FROM User WHERE name=:name")
    List<User> search(@Param("name") String name);
 
    
    
}
