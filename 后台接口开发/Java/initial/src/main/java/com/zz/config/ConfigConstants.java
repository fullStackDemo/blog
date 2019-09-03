package com.zz.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.ClassUtils;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;

public class ConfigConstants {

    @Value("${API_VERSION}")
    public static String fileDir;

    public String getFileDir() {
        return this.fileDir;
    }
}
