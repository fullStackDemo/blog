package hello;

import com.google.gson.Gson;

import java.util.List;
import java.util.HashMap;
import java.util.Map;


public class Utils {
    
    public static String toJSON(int httpCode, int dataCode, List list){
        Map result = new HashMap<>();
        result.put("code", httpCode);
        Map data = new HashMap();
        data.put("code", dataCode);
        data.put("data", list);
        result.put("data", data);
        return new Gson().toJson(result);
    }
    
}
