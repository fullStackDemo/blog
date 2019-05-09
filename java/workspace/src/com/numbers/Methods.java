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
        double d1 = -100.81;
        float f1 = 99;
        System.out.println("Math.ceil()");
        System.out.println(Math.ceil(d1));
        System.out.println(Math.ceil(f1));

        // floor()
        System.out.println("Math.floor()");
        System.out.println(Math.floor(-99.99));
        System.out.println(Math.floor(88.10));

        // rint()
        System.out.println("Math.rint()");
        System.out.println(Math.rint(99.1));
        System.out.println(Math.rint(99.5));
        System.out.println(Math.rint(99.6));

        // round()
        System.out.println("Math.round()");
        System.out.println(Math.round(99.1));
        System.out.println(Math.round(99.9));

        // min()
        System.out.println("Math.min()");
        System.out.println(Math.min(11, 44.1));

        // max()
        System.out.println("Math.max()");
        System.out.println(Math.max(11, 44.1));

        // exp() 对数
        System.out.println("Math.exp()");
        System.out.println(Math.E);
        System.out.println(Math.exp(2));

        // log()
        System.out.println("Math.log()");
        System.out.println(Math.log(7.39));

        // pow
        System.out.println("Math.pow");
        System.out.println(Math.pow(2, 5));

        // sqrt
        System.out.println("Math.sqrt");
        System.out.println(Math.sqrt(2));

        // sin
        double degrees = 60.0;
        double radians = Math.toRadians(degrees);

        System.out.println("Math.sin()");
        System.out.println(radians);
        System.out.println(Math.sin(radians));
        System.out.println(Math.sqrt(3) / 2);

        // cos
        System.out.println("Math.cos()");
        System.out.println(Math.cos(radians));

        // tan
        System.out.println("Math.tan()");
        System.out.println(Math.tan(radians));

        // asin
        System.out.println("Math.asin()");
        System.out.println(Math.asin(Math.sin(radians)) == radians);

        // acos
        System.out.println("Math.acos()");
        System.out.println(Math.acos(Math.cos(radians)) == radians);

        // atan
        System.out.println("Math.atan()");
        System.out.println(Math.atan(Math.tan(radians)) == radians);

        // atan2
        System.out.println("Math.atan2()");
        System.out.println(Math.atan2(30, 45));

        //toDegrees
        System.out.println("Math.toDegrees()");
        System.out.println(Math.round(Math.toDegrees(radians)));

        //toRadians
        System.out.println("Math.toRadians()");
        System.out.println(Math.toRadians(degrees));

        //random
        System.out.println("Math.random()");
        System.out.println(Math.round(Math.random() * 1000 + 1));

    }
}
