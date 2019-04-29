package com.data.type;

public class DataType {
    // 全局变量
    private static String s1 = "hello";

    public String getName(){
        return s1;
    }

    // public 权限修改符 static 静态修饰符 void 返回值修饰符
    public static void main(String[] args) {
        // 局部变量
        String s2 = "Java";
        System.out.println(s1);
        System.out.println(s2);
    }
}
