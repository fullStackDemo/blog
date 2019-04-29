
import com.data.type.DataType;

public class Main {

    private int age;

    public static void main(String[] args) {
        DataType dataType = new DataType();
        System.out.println("Hello World!");
        System.out.println(dataType.getName());

        // byte 内存占 8位 一个字节 -128 ～ 127 如果超出该范围会报错
        byte age = 127;
        System.out.println(age);
        // int 16 位  -2^15 - 1 ~ 2^15 -1
        int num = 9999999;
        System.out.println(num);
    }
}
