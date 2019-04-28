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

一个类包含多种变量：

*  **`Local variable 局部变量`** -- `方法内`、`构造函数`、`模块`内定义的变量都是局部变	量。局部变量在方法内被声明和初始化，当方法执行完毕时被销毁。
*  **`Instance variable`** -- 在一个`class`中声明的但是在`method方法`之外的变量。当`类`被实例化的时候，变量被初始化。实例变量可以在内部方法，构造函数，或者模块内访问。
* **`Class variable`** -- 类变量声明在类中，方法之外，使用static关键字。

### Constructors 构造函数

每一个类都有个构造函数。如果没有明确声明构造函数，则编译的时候会默认生成一个构造函数。

当一个object被创建时，构造函数会被调用。构造函数的名字和类名一致。一个类可能有多个构造函数。

Example

~~~java

public class Pussy {

	static int age = 99;//类变量
	
	String duty = "programming";//实例变量

    public Pussy() {
        System.out.println("1");
    }

    public Pussy(String name){
        System.out.println("2 "+ name);
    }

    public static void main(String[] args) {
        Pussy p1 = new Pussy();
        Pussy p2 = new Pussy("999");

    }
}


~~~

Output

~~~java
1
2 999
~~~

### Creating an Object

从 class 到创建 Object 只需要三步：

* Declaring -- 用对象类型声明变量
* Instantiation -- 用 new 关键字创建 object
* Initialization -- new 之后调用构造函数，初始化一个新的 object


### Accessing Instance Variable and Methods 获取实例变量和方法

~~~java

// first create a object
ObjectReference = new Constructor();

// now call a variable as follow
ObjectReference.variableName

// now call a method as follow
ObjectReference.methodName

~~~

Example

~~~java
public class Puppy {
   int puppyAge;

   public Puppy(String name) {
      // This constructor has one parameter, name.
      System.out.println("Name chosen is :" + name );
   }

   public void setAge( int age ) {
      puppyAge = age;
   }

   public int getAge( ) {
      System.out.println("Puppy's age is :" + puppyAge );
      return puppyAge;
   }

   public static void main(String []args) {
      /* Object creation */
      Puppy myPuppy = new Puppy( "tommy" );

      /* Call class method to set puppy's age */
      myPuppy.setAge( 2 );

      /* Call another class method to get puppy's age */
      myPuppy.getAge( );

      /* You can access instance variable as follows as well */
      System.out.println("Variable Value :" + myPuppy.puppyAge );
   }
}
~~~
Output

~~~java
Name chosen is :tommy
Puppy's age is :2
Variable Value :2
~~~













