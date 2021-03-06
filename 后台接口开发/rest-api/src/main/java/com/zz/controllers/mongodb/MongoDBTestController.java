package com.zz.controllers.mongodb;

import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.terran4j.commons.api2doc.annotations.Api2Doc;
import com.terran4j.commons.api2doc.annotations.ApiComment;
import com.zz.controllers.Person;
import com.zz.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.LinkedList;
import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Api2Doc(name = "Mongodb操作用户")
//@Controller
public class MongoDBTestController {
    
    @Autowired
    MongoTemplate mongoTemplate;
    
    // 插入对象
    @ApiComment(value = "添加人")
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

    //  删除对象
    @GetMapping("/deletePerson")
    @ResponseBody
    public String deletePerson(@RequestParam(value = "name", defaultValue = "") String name) {
        Criteria criteria = where("firstName").in(name);
        DeleteResult result = mongoTemplate.remove(query(criteria), Person.class);
        if (result.getDeletedCount() > 0) {
            return Utils.toJSON(0, 0, null);
        } else {
            return Utils.toJSON(0, 1001, null);
        }
    }
    
    //  更新对象
    @GetMapping("/updatePerson")
    @ResponseBody
    public String updatePerson(@RequestParam(value = "name", defaultValue = "") String name, @RequestParam(value = "value", defaultValue = "") String value) {
        Criteria criteria = where("firstName").in(name);
        Update update = new Update();
        update.inc("version",1);//设置更新自段自增
        UpdateResult result = mongoTemplate.updateFirst(query(criteria), update, Person.class);
        if (result.getModifiedCount() > 0) {
            return Utils.toJSON(0, 0, null);
        } else {
            return Utils.toJSON(0, 1001, null);
        }
    }
    
    
    
    
    
}
