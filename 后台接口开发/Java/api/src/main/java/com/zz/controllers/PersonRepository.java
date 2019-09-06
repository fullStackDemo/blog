package com.zz.controllers;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "test", path = "test")
public interface PersonRepository extends MongoRepository<Person, String> {
    
}
