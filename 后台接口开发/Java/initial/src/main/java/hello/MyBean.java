package hello;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.MongoDbFactory;
import com.mongodb.DB;
import org.springframework.stereotype.Component;


@Component
public class MyBean {
    
    private final MongoDbFactory mongo;
    
    @Autowired
    public MyBean(MongoDbFactory mongo) {
        this.mongo = mongo;
    }
    
    
    
}