package com.data.type;

public class TestAccess {

    protected String name = "alex";

    public static void main(String[] args) {
        DataType dataType = new DataType();
        System.out.println(dataType.getAge());
        System.out.println(dataType.filed);
    }
}
