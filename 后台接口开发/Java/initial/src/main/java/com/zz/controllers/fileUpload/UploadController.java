package com.zz.controllers.fileUpload;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zz.Application;
import com.zz.model.ReturnResponse;
import com.zz.utils.HttpUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.*;

import static com.zz.config.ConfigConstants.getFileDir;

@RestController
public class UploadController {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

//    @Value("${uploadDir}")
    private String fileDir = getFileDir();

    @PostMapping(value = "/upload", consumes = {"multipart/form-data"})
    public String upload(@RequestParam("file") MultipartFile file) {
        System.out.println(getFileDir());
        HttpServletRequest request = HttpUtils.getRequest();
        // 提取文件名
        String fileName = file.getOriginalFilename();
        // 生成文件夹
        File outFile = new File(fileDir);
        if (!outFile.exists()) {
            outFile.mkdir();
            log.info(fileDir + " is not exists");
        } else {
            log.info(fileDir + " is exists");
        }

        try (InputStream inputStream = file.getInputStream()) {
            OutputStream outputStream = new FileOutputStream(fileDir + File.separator + fileName);
            byte[] buffer = new byte[1024];
            int len;
            while ((len = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, len);
            }
            return new ObjectMapper().writeValueAsString(new ReturnResponse<String>(0, "SUCCESS", fileDir + File.separator + fileName));

        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println(file);
        return "success";
    }
}
