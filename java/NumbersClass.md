### Java - Numbers Class

![Number Classes](assets/number_classes.jpg)

#### Number Methods

| NO.  | Method && Description                                        |
| ---- | ------------------------------------------------------------ |
| 1    | xxxValue()<br />转换为指定类型的值                           |
| 2    | compareTo()<br />比较值的大小                                |
| 3    | equals()<br />判断大小                                       |
| 4    | valueOf()<br />返回一个整数对象并且持有指定的值              |
| 5    | toString()<br />返回一个字符串对象代表当前指定的int or integer |
| 6    | parseInt()<br />方法用于格式化一些字符串返回整数             |
| 7    | abs()<br />求绝对值                                          |
| 8    | ceil()<br />向上取整 , 返回double                            |
| 9    | floor()<br />向下取整, 返回 double                           |
| 10   | rint()<br />四舍五入取整数，返回double                       |
| 11   | round()<br />四舍五入                                        |
| 12   | min()<br />取最小值                                          |
| 13   | max()<br />取最大值                                          |
| 14   | exp()<br />对数e的计算                                       |
| 15   | log()<br />返回自然的对数                                    |
| 16   | pow()<br />阶运算，第一个参数做底数，第二参数做阶数          |
| 17   | sqrt()<br />获取平方根                                       |
| 18   | sin()<br />正弦                                              |
| 19   | cos()<br />余弦                                              |
| 20   | tan()<br />正切                                              |
| 21   | asin()<br />反正弦                                           |
| 22   | acos()<br />反余弦                                           |
| 23   | atan()<br />反正切                                           |
| 24   | atan2()<br />直角坐标转换为极坐标                            |
| 25   | toDegrees()<br />转换为角度                                  |
| 26   | toRadians()<br />转换为弧度                                  |
| 27   | random()<br />随机数                                         |

**Example**

```java
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

```

**Output**

```java
Number.xxxValue()
8
8.0
8
Number.compareTo()
1
0
-1
Number.equals()
true
false
false
false
Number.valueOf()
99.0
90.0
999
9
Number.toString()
true
parseInt()
666
888.0
777.0
Math.abs()
99
88.88
Math.ceil()
-100.0
99.0
Math.floor()
-100.0
88.0
Math.rint()
99.0
100.0
100.0
Math.round()
99
100
Math.min()
11.0
Math.max()
44.1
Math.exp()
2.718281828459045
7.38905609893065
Math.log()
2.0001277349601105
Math.pow
32.0
Math.sqrt
1.4142135623730951
Math.sin()
1.0471975511965976
0.8660254037844386
0.8660254037844386
Math.cos()
0.5000000000000001
Math.tan()
1.7320508075688767
Math.asin()
true
Math.acos()
true
Math.atan()
true
Math.atan2()
0.5880026035475675
Math.toDegrees()
60
Math.toRadians()
1.0471975511965976
Math.random()
199
```

