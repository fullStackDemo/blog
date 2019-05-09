package com.loop;

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
