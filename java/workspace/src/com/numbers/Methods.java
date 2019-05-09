package com.numbers;

public class Methods {
    public static void main(String[] args) {
        Integer x = 8;
        // XXXValue()
        System.out.println("Number.xxxValue()");
        // return byte primitive data type
        System.out.println(x.byteValue());
        // return double primitive data type
        System.out.println(x.doubleValue());
        // return long primitive data type
        System.out.println(x.longValue());

        // compareTo();
        System.out.println("Number.compareTo()");
        // return 1
        System.out.println(x.compareTo(6));
        // return 0
        System.out.println(x.compareTo(8));
        // return -1
        System.out.println(x.compareTo(10));

        // equals()
        System.out.println("Number.equals()");
        Integer y = 8;
        Integer z = 9;
        short h = 8;
        String m = "8";
        System.out.println(x.equals(y));
        System.out.println(x.equals(z));
        System.out.println(x.equals(h));
        System.out.println(x.equals(m));


        //

    }
}
