
import com.data.type.DataType;
import com.data.type.TestAccess;

class Test2 extends TestAccess {

    protected String name2 = "name2";

    static String name3;

    final String name4 = "name4";

    protected static void setName3(String name3) {
        Test2.name3 = name3;
    }

    public static void main(String[] args) {
        System.out.println(name3);
    }

}

public class Main {

    private int age;

    public static final String TESTNAME = "TESTNAME";

    public static void main(String[] args) {
        DataType dataType = new DataType();
        System.out.println("Hello World!");
        System.out.println(dataType.getName());

        // byte 内存占 8位 一个字节 -128 ～ 127 如果超出该范围会报错
        byte age = 127;
        System.out.println(TESTNAME);
        // int 16 位  -2^15 - 1 ~ 2^15 -1
        int num = 9999999;
        System.out.println(num);

        System.out.println(dataType);

        Test2 testAccess = new Test2();
        Test2.setName3("99test");
        System.out.println(Test2.name3);

    }
}
