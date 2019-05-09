### Java - Loop Control

**循环控制**

[TOC]



| NO.  |      Loop       |
| ---- | :-------------: |
| 1    |   while loop    |
| 2    |    for loop     |
| 3    | do...while loop |

#### 1、while loop

![Java While Loop](https://www.tutorialspoint.com/java/images/java_while_loop.jpg)

**Example**:

```java
public class TestWhile {
    public static void main(String[] args) {
        int x = 10;
        while (x < 20) {
            System.out.println(x);
            x++;
        }
    }
}
```

**output**:

```
10
11
12
13
14
15
16
17
18
19
```

#### 2、for loop

![Java For Loop](assets/java_for_loop.jpg)

**Example**

```java
public class TestFor {
    public static void main(String[] args) {
        int persons[] = {1, 2, 3, 4, 5, 6};

        // case 1
        System.out.println("第一种用法");
        for (int i = 0, len = persons.length; i < len; i++) {
            System.out.println(persons[i]);
        }

        // case 2
        System.out.println("第二种用法");
        for (int person : persons) {
            System.out.println(person);
        }
    }
}
```

**output**

```
第一种用法
1
2
3
4
5
6
第二种用法
1
2
3
4
5
6
```

#### 3、do...while loop

![Java Do While Loop](assets/java_do_while_loop.jpg)

**Example**

```java
public class TestDo {
    public static void main(String[] args) {
        int x = 10;
        do {
            System.out.println(x);
            x++;
        } while (x < 20);
    }
}
```

**Output**

```
10
11
12
13
14
15
16
17
18
19
```

