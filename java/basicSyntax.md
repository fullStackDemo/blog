## Basic Syntax

如果你想写一个Java程序，一定要了解 `类`、`实例变量`、`方法`、`对象` 分别意味着什么。

> **Class**:
> 
> 一个类可以被定义为一种模版或者蓝图，描述一个对象类型所需要的状态和行为。比如人类，蓝眼睛，黑头发，会说话会走路。
> 
> 
> **Instance Variables**:
> 
> 每一个对象，都有它的独特的实例变量。 对象的状态就是关联这些实例变量的值而生成的。
> 
> 
> **Methods**:
> 
> 一个方法就是一种行为。一个对象可以有多种方法，每个方法里面是执行逻辑的地方，数据操作和动作执行
> 
> 
> **Object**:
> 
> 一个对象有很多状态和行为。对象是类的实例化。
> 
> 
> 


### Use Case 注意事项：

* 大小写 - 不同大小写代表不同含义
* 类名要大写，如果是多个单词，每个单词首字母大写 MyFirstClass
* 方法名，首字母小写，如果是多个单词，其余单词首字母大写
* 程序文件名字和类名保持一致，否则不会编译
* `public static void main(String args[])` 每一个java文件执行都是从此开始


### Java Identifiers 标识符

所有的Java component都需要名字。这些类和实例的名字都成为标识符。

标识符规则：

* 第一个字符应该是`子母、$、_ `开始均可
* 第一个字符后，可以结合任何字符
* `关键字`不能当作标识符
* 区分大小写
* 合法：age, $salary, _value, __1_value.
* 非法: 123abc, -salary

### Java Modifiers 修饰符

通过修饰符可以更改`类、方法`，有以下两种类型：

* **Access Modifiers** − default, public , protected, private

* **Non-access Modifiers** − final, abstract, strictfp

### Java Variables 变量

* Local Variable 局部变量
* Class Variable （Static Variable） 类变量（静态变量）
* Instance Variable （non-static variable）实例变量（非静态变量）

### Java Array 数组

数组就是存储多个同类型对象的。数组是堆对象


### Java Enums  枚举

#### Example

~~~java
class FreshJuice {
    enum FreshJuiceSize {small, midium, large};
    FreshJuiceSize size;
}

public class FreshJuiceTest {
    public static void main(String[] args) {
        FreshJuice juice = new FreshJuice();
        juice.size = FreshJuice.FreshJuiceSize.small;
        System.out.println(juice.size);
    }
}
~~~

#### Output
~~~java
small
~~~

### Java Keywords

关键字不能当作类名或者其他变量名字


| abstract	    | assert	    |boolean | break |
|:-------------: |:---------: | :-----: | :---: |
|byte	  			|case	   		|catch 	|char
|class				|const			|continue	|default
|do	    			|double		|else		|enum
|extends			|final			|finally	|float
|for				|goto			|if			|implements
|import			|instanceof	|int		|interface
|long				|native		|new		|package
|private			|protected	|public	|return
|short				|static		|strictfp	|super
|switch			|synchronized	|this		|throw
|throws			|transient	|try		|void
|volatile			|while		


### Comments in Java 注释

#### Example

~~~java
import java.util.HashMap;

public class Main {

    public static void main(String[] args) {

        HashMap<String, String> map = new HashMap();
        map.put("key", "888");
        map.put("value", "99");
        System.out.println(map);
        System.out.println(map.toString());
        /**
         *  multiple line coments
         * */
        // single line comment
    }
}
~~~

### Inheritance 继承

当你想新建一个类的时候，发现一个现有的类可以使用，这时候就可以继承这个现有的类。现有类被称为超类 Superclass，派生的类成为子类 subclass。







