package com.zz.controllers;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Element;
import com.itextpdf.text.pdf.*;
import org.springframework.http.*;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class PdfUtils {
    
    
    /**
     * 通过URL 获取 outputStream
     */
    private static void getPdf(OutputStream outputStream, String url) {
        
        RestTemplate restTemplate = new RestTemplate();
        
        final String Application_pdf = "application/pdf";
        
        HttpHeaders headers = new HttpHeaders();
        InputStream inputStream = null;
        
        try {
            List list = new ArrayList<>();
            list.add(MediaType.valueOf(Application_pdf));
            headers.setAccept(list);
            
            ResponseEntity<byte[]> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    new HttpEntity<byte[]>(headers),
                    byte[].class
            );
            
            byte[] result = response.getBody();
            assert result != null;
            inputStream = new ByteArrayInputStream(result);
            
            int len = 0;
            byte[] buf = new byte[1024];
            
            while ((len = inputStream.read(buf, 0, 1024)) != -1) {
                outputStream.write(buf, 0, len);
            }
            
            outputStream.flush();
            
            
        } catch (Exception e) {
            
            e.printStackTrace();
            
        } finally {
            
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            
            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    
    /**
     * outputStream  转  inputStream
     */
    public static ByteArrayInputStream parse(OutputStream out) {
        ByteArrayOutputStream baos;
        baos = (ByteArrayOutputStream) out;
        ByteArrayInputStream swapStream = new ByteArrayInputStream(baos.toByteArray());
        return swapStream;
    }
    
    /*
     * inputStream 添加水印
     * @param is
     * */
    public static void addTestWaterMask(InputStream is, String text, OutputStream os) throws Exception {
        PdfReader reader = new PdfReader(is, "pdf".getBytes());
        
        PdfStamper stamper = new PdfStamper(reader, os);
        // page size
        int pageSize = reader.getNumberOfPages();
        
        // single page height
        float pageHeight = reader.getPageSize(1).getHeight();
        // single page width
        float pageWidth = reader.getPageSize(1).getWidth();
        
        try {
            // single page contains line numbers
            int lineNum = (int) (pageHeight / 20);
            // every two line show two water masks, one is on left, one is on right
            int middleX = (int) pageWidth / 2;
            int middleH = (int) pageHeight / 2;
            
            // loop every page
            for (int i = 0; i < pageSize; i++) {
                // loop every line of every page
                for (int j = 0, k = 0; j < lineNum; j += 2, k++) {
                    PdfContentByte under = stamper.getUnderContent(i);
                    under.beginText();
                    
                    // font
                    BaseFont baseFont = BaseFont.createFont("STSong-Light", "UniGB-UCS2-H", BaseFont.EMBEDDED);
                    under.setFontAndSize(baseFont, 40);
                    under.setTextMatrix(10, 10);
                    
                    // opacity
                    PdfGState pdfGState = new PdfGState();
                    pdfGState.setFillOpacity(0.2f);
                    under.setGState(pdfGState);
                    
                    under.setColorFill(BaseColor.GRAY);
                    under.showTextAligned(Element.ALIGN_LEFT, text, middleX / 2, middleH / 2, 45);
                    under.showTextAligned(Element.ALIGN_LEFT, text, middleX + middleX / 2, middleH + middleH / 2, 45);
                    
                    under.endText();
                    
                }
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            stamper.close();
            reader.close();
        }
        
        
    }
    
   /*
    *  download pdf
    * */
   public static void downloadPdf(String viewType, HttpServletResponse response, String fileName, String url, String content) throws Exception {
   
       viewType = StringUtils.isEmpty(viewType) ? viewType : "attachment";
       
       if(!"attachment".equals(viewType) && !"inline".equals(viewType)){
           throw new Exception("文件类型有误");
       }
       
       response.setContentType("application/pdf");
       response.setHeader("Content-disposition", viewType+";filename="+ new String(fileName.getBytes(), "iso-8859-1"));
       OutputStream outputStream = response.getOutputStream();
       OutputStream outputStreamTemp = new ByteArrayOutputStream();
//       CRMUtil.getFile(outputStream, url);
    
       InputStream bis = parse(outputStreamTemp);
       addTestWaterMask(bis, content, outputStream);
       outputStream.flush();
       outputStream.close();
   
   }
    
    
}
