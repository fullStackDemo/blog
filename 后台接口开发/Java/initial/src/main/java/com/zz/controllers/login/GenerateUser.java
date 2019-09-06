package com.zz.controllers.login;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zz.model.Response;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.NoSuchAlgorithmException;

import static com.zz.utils.MD5Utils.generateMd5;


@RestController
public class GenerateUser {


    @GetMapping("/md5")
    @ResponseBody
    public String generate(@RequestParam String username, @RequestParam String password) throws NoSuchAlgorithmException, JsonProcessingException {
        String md5 = generateMd5(username, password);
        return new ObjectMapper().writeValueAsString(new Response<String>(0, "success", md5));
    }
}
