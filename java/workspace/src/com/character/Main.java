package com.character;

public class Main {
  public static void main(String[] args) {
    char a = 'a';
    System.out.println(a);
    
    char[] arr = {'a', '\t', 'b'};
    System.out.println(arr);
    
    //判断是否是子母
    // false
    System.out.println(Character.isLetter('9'));
    // true
    System.out.println(Character.isLetter('u'));
    // true
    System.out.println(Character.isDigit('9'));
    // false
    System.out.println(Character.isDigit('p'));
    // true
    System.out.println(Character.isUpperCase('U'));
    // false
    System.out.println(Character.isUpperCase('9'));
    // true
    System.out.println(Character.isLowerCase('p'));
    // toUpperCase
    System.out.println(Character.toUpperCase('a'));
    System.out.println(Character.toLowerCase('H'));
    System.out.println(Character.toString('9'));
    System.out.println(Character.codePointAt(arr, 0));
  }
}
