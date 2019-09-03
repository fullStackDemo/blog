package com.zz.controllers.fileUpload;

import com.zz.Application;
import com.zz.controllers.HttpUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

@RestController
public class UploadController {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @PostMapping(value = "/upload", consumes = {"multipart/form-data"})
    public String upload(@RequestParam("file") MultipartFile file) {
        HttpServletRequest request = HttpUtils.getRequest();
        // 提取文件名
        String fileName = file.getOriginalFilename();

        System.out.println(file);
        return "success";
    }
}
