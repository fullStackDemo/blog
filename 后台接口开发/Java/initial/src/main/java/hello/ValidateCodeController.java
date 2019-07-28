package hello;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
public class ValidateCodeController {
    
    // 生成验证码,返回的是 base64
    @RequestMapping("/getCaptchaBase64")
    @ResponseBody
    public Object getCaptchaBase64(HttpServletRequest request, HttpServletResponse response) {
        
        Map result = new HashMap();
        Response response1 = new Response();
        
        try {
            
            response.setContentType("image/png");
            response.setHeader("Cache-Control", "no-cache");
            response.setHeader("Expire", "0");
            response.setHeader("Pragma", "no-cache");
            
            ValidateCode validateCode = new ValidateCode();
            
            // 直接返回图片
            // validateCode.getRandomCode(request, response);
            
            // 返回base64
            String base64String = validateCode.getRandomCodeBase64(request, response);
            result.put("url", "data:image/png;base64," + base64String);
            result.put("message", "created successfull");
            System.out.println("test=" + result.get("url"));
            response1.setData(0, result);
            
        } catch (Exception e) {
            System.out.println(e);
        }
        
        return response1.getResult();
    }
    
    
    // 生成验证码图片
    @RequestMapping("/getCaptchaImage")
    @ResponseBody
    public void getCaptcha(HttpServletRequest request, HttpServletResponse response) {
        
        try {
            
            response.setContentType("image/png");
            response.setHeader("Cache-Control", "no-cache");
            response.setHeader("Expire", "0");
            response.setHeader("Pragma", "no-cache");
            
            ValidateCode validateCode = new ValidateCode();
            
            // 直接返回图片
            validateCode.getRandomCodeImage(request, response);
            
        } catch (Exception e) {
            System.out.println(e);
        }
        
    }
    
    /*
     * 检验验证码
     * */
    @PostMapping("/checkCaptcha")
    public Boolean checkCaptcha(@RequestParam Map<String, Object> requestMap, HttpSession session) {
        try {
            String code = requestMap.get("code").toString();
            String sessionKey = (String) session.getAttribute("RANDOMKEY");
            
            if (sessionKey == null) {
                return false;
            }
            
            return sessionKey.equalsIgnoreCase(code);
            
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
