package com.zz.config;


import org.springframework.beans.factory.annotation.Value;

public class ConfigConstants {

    public static String fileDir;


    @Value("@{uploadDir}")
    public static String getFileDir() {
        fileDir = System.getProperty("user.dir") + "\\src\\main\\file";
        return fileDir;
    }
}
