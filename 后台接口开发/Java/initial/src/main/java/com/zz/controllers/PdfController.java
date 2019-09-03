package com.zz.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/v1/pdf")
public class PdfController {
    
    @RequestMapping("/download")
    public void getPdf(
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestParam(name = "test", required = false) String text,
            @RequestParam(name = "viewType", required = false) String viewType,
            @RequestParam(name = "", required = false) String url
            ) {
        try {
            PdfUtils.downloadPdf(viewType, response, "test", url, text);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
