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


        // valueOf()
        System.out.println("Number.valueOf()");
        System.out.println(Double.valueOf("99"));
        System.out.println(Float.valueOf("90"));
        System.out.println(Long.valueOf("999"));
        System.out.println(Integer.valueOf("9", 16));

        // toString
        System.out.println("Number.toString()");
        String s1 = Integer.toString(8);
        System.out.println(s1 instanceof String);

        // parseInt()
        System.out.println("parseInt()");
        System.out.println(Integer.parseInt("666"));
        System.out.println(Double.parseDouble("888"));
        System.out.println(Float.parseFloat("777"));

        // abs()
        System.out.println("Math.abs()");
        System.out.println(Math.abs(Integer.parseInt("-99")));
        System.out.println(Math.abs(Double.parseDouble("-88.88")));

        // ceil() return double type
        double d1=-100.81;
        float f1 = 99;
        System.out.println("Math.ceil()");
        System.out.println(Math.ceil(d1));
        System.out.println(Math.ceil(f1));

        // floor()
        System.out.println("Math.floor()");
        System.out.println(Math.floor(-99.99));
        System.out.println(Math.floor(88.10));



    }
}
