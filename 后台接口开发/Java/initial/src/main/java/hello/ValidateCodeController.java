package hello;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
public class ValidateCodeController {
    // 生成验证码
    @RequestMapping("/getCaptcha")
//    public void getCaptcha(HttpServletRequest request, HttpServletResponse response) {
    public Object getCaptcha(HttpServletRequest request, HttpServletResponse response) {
        
        Map result = new HashMap();
        Response response1 = new Response();
        
        try {
            response.setContentType("image/png");
            response.setHeader("Cache-Control", "no-cache");
            response.setHeader("Expire", "0");
            response.setHeader("Pragma", "no-cache");
            
            ValidateCode validateCode = new ValidateCode();
            // 直接返回图片
            validateCode.getRandomCode(request, response);
            
            // 返回base64
            String base64String = validateCode.getRandomCode(request, response);
            result.put("url", "data:image/png;base64," + base64String);
            result.put("message", "created successfull");
            System.out.println("test=" + result.get("url"));
            response1.setData(0, result);
            
        } catch (Exception e) {
            System.out.println(e);
        }
        
        return response1.getResult();
    }
    
}
