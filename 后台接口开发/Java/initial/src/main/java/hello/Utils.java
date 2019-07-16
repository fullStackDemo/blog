package hello;

import com.google.gson.Gson;

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
    
}
