package com.zz.controllers.fileUpload;

import com.zz.Application;
import com.zz.model.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.UUID;

import static com.zz.config.ConfigConstants.getFileDir;

@RestController
@Configuration
public class UploadController {
    
    private static final Logger log = LoggerFactory.getLogger(Application.class);
    
    @Value("${server.port}")
    private String port;
    
    public String getIp() {
        InetAddress localhost = null;
        try {
            localhost = Inet4Address.getLocalHost();
        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
        }
        return localhost.getHostAddress();
    }
    
    
    @PostMapping(value = "/upload", consumes = {"multipart/form-data"})
    public Response upload(@RequestParam("file") MultipartFile[] files, Response response) {
        log.info("上传多个文件");
        StringBuilder builder = new StringBuilder();
        // file address
        String fileAddress ="http://"+ getIp()+ ":" + port + File.separator;
    
        ArrayList<String> imgUrls = new ArrayList<String>();
        try {
            for (int i = 0; i < files.length; i++) {
                // old file name
                String fileName = files[i].getOriginalFilename();
                // new filename
                String generateFileName = UUID.randomUUID().toString().replaceAll("-", "") + fileName.substring(fileName.lastIndexOf("."));
                // store filename
                String distFileAddress = fileAddress + generateFileName;
                builder.append(distFileAddress+",");
                imgUrls.add(distFileAddress);
                // generate file to disk
                files[i].transferTo(new File(getFileDir() + generateFileName));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        response.setMsg("success");
        log.info(builder.toString());
        response.setData(imgUrls);
        return response;
    }
}
