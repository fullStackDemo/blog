package com.zz.model;

public class Response<RC> {

    private int code;
    private String msg;
    private RC content;

    public Response(int code, String msg, RC content) {
        this.code = code;
        this.msg = msg;
        this.content = content;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getMsg() {
        return msg;
    }

    public void setContent(RC content) {
        this.content = content;
    }

    public RC getContent() {
        return content;
    }


}
