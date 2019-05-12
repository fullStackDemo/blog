package com.String;

public class Main {
  public static void main(String[] args) {
    char[] str = {'1', 'a', '2', 'b'};
    String hstr = new String(str);
    System.out.println(hstr + " " + hstr.length());
    hstr = "99";
    // concat 生成新的字符串
    String newStr = hstr.concat(" hello world");
    System.out.println(hstr);
    System.out.println(newStr);
  
    String fs;
    fs = String.format("The value of the float variable is " +
            "%f, while the value of the integer " +
            "variable is %d, and the string " +
            "is %s", 1.00, 2, "88");
    System.out.println(fs);
    System.out.println("-----------------");
    // methods
    String s = "Strings are immutable";
    
    // charAt()
    // r
    System.out.println(s.charAt(2));
    // compareTo
    String s1 = new String("Strings are immutable");
    // 0
    System.out.println(s.compareTo(s1));
    // true
    System.out.println(s1.equals(s));
    String s2 = new String("88Strings 99are immutable");
    // 27
    System.out.println(s.compareTo(s2));
  
    // 0 忽略大小写
    System.out.println(s.compareToIgnoreCase(s1.toUpperCase()));
    
    // 字符串连接
    System.out.println(s.concat(s2));
    
    // 判断内容是否相等
    System.out.println(s.contentEquals(s1));
    
    char[] s3 = {'1', 'b', 'c'};
    System.out.println(s1.copyValueOf(s3));
  
    System.out.println(s1);
    
    
    
  }
}
