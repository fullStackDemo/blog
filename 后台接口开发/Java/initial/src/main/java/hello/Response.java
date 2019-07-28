package hello;

import java.util.HashMap;
import java.util.Map;

public class Response {
    private int code = 0;
    private String message = "";
    private Map data = new HashMap();
    
    // 设置Http请求状态 0 成功 500 服务器错误 405 没有权限
    public void setCode(int code) {
        this.code = code;
    }
    
    // 设置提示语
    public void setMessage(String msg) {
        this.message = msg;
    }
    
    // 设置返回数据的状态  0 有数据 1001 无数据
    public void setData(int code, Map map) {
        data.put("code", code);
        data.putAll(map);
    }
    
    // 获取 data
    private Map getData() {
        return data;
    }
    
    // 返回最终结果
    
    public Object getResult() {
        
        Map result = new HashMap();
        result.put("code", this.code);
        if (!message.equalsIgnoreCase("")) {
            result.put("message", this.message);
        }
        result.put("data", this.getData());
        
        return result;
    }
    
}
