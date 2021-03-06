package com.zz.controllers.login;

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
    public Response generate(@RequestParam String username, @RequestParam String password) throws NoSuchAlgorithmException {
        String md5 = generateMd5(username, password);
        Response response = new Response();
        response.setData(md5);
        response.setCode(0);
        response.setMsg("success");
        return response;
    }
}
