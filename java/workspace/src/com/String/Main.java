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
    // 1bc
    System.out.println(s1.copyValueOf(s3));
    //Strings are immutable
    System.out.println(s1);
    // c
    System.out.println(s1.copyValueOf(s3, 2, 1));
    
    // 判断是否以固定后缀结尾
    System.out.println(s.endsWith("able"));
    System.out.println(s.equalsIgnoreCase(s1));
    
    // 获取固定编码生成的字节数组
    System.out.println(s.getBytes());
    byte[] bytes = s.getBytes();
    for (byte b : bytes) {
      byte[] single = {b};
      int index = s.indexOf(new String(single));
      System.out.print(index);
      System.out.print(" -- ");
      System.out.print(s.charAt(index));
      System.out.print(" -- ");
      System.out.print(b);
      System.out.print(" -- ");
      System.out.println(new String(single));
    }
    
    // 复制字符到字符数组
    char[] dist = {' ', '1', '2', ' ', ' ', ' ', ' ', ' ', ' '};
    s.getChars(0, 6, dist, 2);
    // "String"
    System.out.println(dist);
    System.out.println(dist.length);
    for (char c : dist) {
      System.out.println(c);
    }
    
    // hashcode
    System.out.println(s.hashCode());
    System.out.println(s1.hashCode());
    
    System.out.println(s.indexOf("tr"));
    System.out.println(s.indexOf("tr", 4));
    
    System.out.println(s.intern());
    // 17
    System.out.println(s.lastIndexOf('a'));
    // 17
    System.out.println(s.lastIndexOf('a', 18));
    // 3
    System.out.println(s.lastIndexOf('i', 3));
    // -1
    System.out.println(s.lastIndexOf('s', 3));
    // 8
    System.out.println(s.lastIndexOf("are"));
    // -1
    System.out.println(s.lastIndexOf("are", 2));
    
    // regexp 匹配
    System.out.println(s.matches(".*"));
    
    // true 区域字符串进行比较
    System.out.println(s.regionMatches(true, 0, "String", 0, 5));
    
    // 简单替换
    System.out.println(s.replace('e', '9'));
    // 正则替换
    //Strings 00 immutable
    System.out.println(s.replaceAll("(are)", "00"));
    //Strings ar77 immutable
    System.out.println(s.replaceFirst("e", "77"));
    
    // 分割字符串
    //{'Strings ar', 'immutabl'}
    String[] splitStr = s.split("e");
    // Strings ar
    // immutabl
    for (String _s : splitStr) {
      System.out.println(_s);
    }

//    System.out.println(s.split("e", 5));
  
  
  }
}
