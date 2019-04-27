## Java Object and Class


`Java`是面向对象的，所以`Java`支持以下基本概念：

* Polymorphism 多态性
* Inheritance  继承
* Encapsulation 封装
* Abstraction 抽象
* Classes 类
* Objects 对象
* Instance 实例
* Method 方法
* Message Passing 消息传递机制

### Concepts of Objects and Classes

* **`Object`** - 对象有状态和行为，比如一只小狗，`yellow skin` 是状态，`braking` 是行为
* **`Class`** - 类可以被定义为描述它支持的同类型的对象的状态和行为，比如 小狗是属于动物这一类

### Object is Java

在现实世界中，很多都能被称为对象，Cars、Dogs、Humans、.etc。每一个对象都有状态和行为。

假设一个小狗狗，名字、品种、颜色是它的状态，摇尾巴、跑、吃是它的行为；。

如果我们拿软件和real world作比较，也有很多相似之处。

软件也有状态和行为。软件把状态存储在变量中，然后通过方法展示出来。所以在软件中，方法来操作一个对象的状态，对象与对象之前的通信也是通过方法来实现的。


### Class in Java

类是一个创建单个对象的蓝图；

#### Example

~~~java
public class Dog {
    String breed = "male";
    int age = 2;
    String color = "yellow";

    void braking() {
        System.out.println("Dog is braking");
    }

    void sleeping() {
        System.out.println("Dog is sleeping");
    }

    void eating() {
        System.out.println("Dog is eating");
    }

    public static void main(String[] args) {
        Dog dog = new Dog();
        System.out.println("The");
        System.out.println(dog.age);
        System.out.println(dog.color);
        System.out.println(dog.breed);
        dog.braking();
        dog.eating();
        dog.sleeping();
    }
}
~~~

Output

~~~java
The
2
yellow
male
Dog is braking
Dog is eating
Dog is sleeping
~~~











