## Java - modifier type 修饰符类型

java修改符有两种类型

* Java access modifiers
* Java non-access modifiers

一种是权限修饰符，另外一种是无权限修饰符。

Example

~~~java

public class className {}

static String someName;

public static final String someName;

protected String someName;


~~~


### Java access control modifiers 权限修饰符

四类：

* 默认不添加修饰符类型的，**`package`** 内均可相互访问
* **`private`** -- 只能在当前 `class` 中访问
* **`public`** -- 所有均可访问
* **`protected`** -- 在 `package` 和 `subClass` 内可以访问


	