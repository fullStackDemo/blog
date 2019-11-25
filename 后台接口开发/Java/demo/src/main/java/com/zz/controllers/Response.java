package com.zz.controllers;

import com.terran4j.commons.api2doc.annotations.ApiComment;

import java.util.HashMap;
import java.util.Map;

public class Response {
    
    @ApiComment(value = "response code", sample = "0")
    private int code = 0;
    
    @ApiComment(value = "response message", sample = "successful")
    private String message = "";
    
    @ApiComment(value = "response message", sample = "null")
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
