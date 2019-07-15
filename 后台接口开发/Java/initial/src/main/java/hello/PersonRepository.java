package hello;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "test", path = "people")
public interface PersonRepository extends MongoRepository<Person, String> {
    
    List<Person> findAll();
}
