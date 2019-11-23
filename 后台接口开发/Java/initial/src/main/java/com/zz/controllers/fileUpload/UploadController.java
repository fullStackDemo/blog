package com.zz.controllers.fileUpload;

import com.zz.Application;
import com.zz.model.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.UUID;

import static com.zz.config.ConfigConstants.getFileDir;

@RestController
public class UploadController {
    
    private static final Logger log = LoggerFactory.getLogger(Application.class);
    
    
    @PostMapping(value = "/upload", consumes = {"multipart/form-data"})
    public Response upload(@RequestParam("file") MultipartFile[] files, Response response) {
        log.info("上传多个文件");
        StringBuilder builder = new StringBuilder();
        try {
            for (int i = 0; i < files.length; i++) {
                // old file name
                String fileName = files[i].getOriginalFilename();
                // new filename
                String generateFileName = UUID.randomUUID().toString().replaceAll("-", "") + fileName.substring(fileName.lastIndexOf("."));
                // store filename
                builder.append(generateFileName + (i < files.length - 1 ? "||" : ""));
                // generate file to disk
                files[i].transferTo(new File(getFileDir() + generateFileName));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        response.setMsg("success");
        response.setData(builder.toString());
        return response;
    }
}
