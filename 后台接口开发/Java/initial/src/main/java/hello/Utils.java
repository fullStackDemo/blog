package hello;

import com.google.gson.Gson;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import java.util.List;
import java.util.HashMap;
import java.util.Map;


public class Utils {

    //  格式化 map
    public static String toJSON(Map map) {
        return new Gson().toJson(map);
    }

    //  格式化 list
    public static String toJSON(List list) {
        return new Gson().toJson(list);
    }

    // 格式化返回结果
    public static String toJSON(int httpCode, int dataCode, List list) {
        Map result = new HashMap<>();
        // http status code
        result.put("code", httpCode);
        //  data
        Map data = new HashMap();
        //  response status code
        data.put("code", dataCode);
        //  response data
        data.put("data", list);

        result.put("data", data);

        return toJSON(result);
    }

    public static String toJSON(int httpCode, int dataCode, int id) {
        Map result = new HashMap<>();
        // http status code
        result.put("code", httpCode);
        //  data
        Map data = new HashMap();
        //  response status code
        data.put("code", dataCode);
        //  response data
        data.put("id", id);

        result.put("data", data);

        return toJSON(result);
    }

    /*
    * 获取客户端真实 IP
    * **/
    public static String getRemoteIp(HttpServletRequest request) {
        String ipAddress = null;
        try {
            ipAddress = request.getHeader("x-forwarded-for");

            if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
                ipAddress = request.getHeader("Proxy-Client-IP");
            }

            if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
                ipAddress = request.getHeader("WL-Proxy-Client-IP");
            }

            if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
                ipAddress = request.getRemoteHost();
                if (ipAddress.equals("127.0.0.1")) {
                    // 根据网卡读取本机ip
                    InetAddress inetAddress = null;
                    try {
                        inetAddress = InetAddress.getLocalHost();
                        ipAddress = inetAddress.getHostAddress();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }

                }
            }


        } catch (Exception e) {
            e.printStackTrace();
        }
        return ipAddress;
    }

}
