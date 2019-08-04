package hello;

import com.terran4j.commons.api2doc.annotations.Api2Doc;
import com.terran4j.commons.api2doc.annotations.ApiComment;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

@Api2Doc(name = "USER类接口", order = 1)
@ApiComment(seeClass = Response.class)
@RestController
@RequestMapping("/api/v1/user")
public class ValidateCodeController {
	
	// 生成验证码,返回的是 base64
	@ApiComment("生成验证码-返回base64")
	@RequestMapping(name = "生成验证码-返回base64", value = "/getCaptchaBase64", method = RequestMethod.GET)
	@ResponseBody
	public Response getCaptchaBase64(HttpServletRequest request, HttpServletResponse response) {
		
		Map result = new HashMap();
		Response response1 = new Response();
		
		try {
			
			response.setContentType("image/png");
			response.setHeader("Cache-Control", "no-cache");
			response.setHeader("Expire", "0");
			response.setHeader("Pragma", "no-cache");
			
			ValidateCode validateCode = new ValidateCode();
			
			// 返回base64
			String base64String = validateCode.getRandomCodeBase64(request, response);
			result.put("url", "data:image/png;base64," + base64String);
			result.put("message", "created successfull");
			System.out.println("test=" + result.get("url"));
			response1.setData(0, result);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return response1;
	}
	
	
	// 生成验证码图片
	@ApiComment("生成验证码-返回image")
	@RequestMapping(name = "生成验证码-返回image", value = "/getCaptchaImage", method = RequestMethod.GET)
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
			e.printStackTrace();
		}
		
	}
	
	/*
	 * 检验验证码
	 * */
	@ApiComment(value = "检验验证码")
	@RequestMapping(value = "/checkCaptcha", method = RequestMethod.GET, params ="code")
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
	
	// 检验md5
	@ApiComment("检验md5")
	@GetMapping("/checkMd5")
	public boolean checkMd5(@RequestParam Map<String, String> requestObj) throws NoSuchAlgorithmException {
		try {
			String pwd = requestObj.get("pwd");
			if (pwd != null) {
				String encryptPwd = MD5Utils.MD5_32bit("admin123!");
				return encryptPwd.equalsIgnoreCase(pwd);
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return  false;
		}
	}
}
