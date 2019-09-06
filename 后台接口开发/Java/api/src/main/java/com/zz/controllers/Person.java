package com.zz.controllers;

import org.springframework.data.annotation.Id;

import java.util.HashMap;
import java.util.Map;

public class Person {
    @Id
    private String id;
    
    private String firstName;
    private String lastName;
    
    public String getFirstName(){
        return this.firstName;
    }
    
    public void setFirstName(String firstName){
        this.firstName = firstName;
    }
    
    public String getLastName(){
        return this.lastName;
    }
    
    public void setLastName(String lastName){
        this.lastName = lastName;
    }
    
    public String getJSON(){
        Map<String, String> map = new HashMap<String, String>();
        map.put("firstName", this.firstName);
        map.put("lastName", this.lastName);
        return map.toString();
    }
}
