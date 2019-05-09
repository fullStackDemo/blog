package com.decision;

public class Main {
    public static void main(String[] args) {
        // if
        boolean test1 = true;
        if (test1) {
            System.out.println("test1 true");
        }

        // if...else
        boolean test2 = false;
        if (test2) {
            System.out.println("test2 true");
        } else {
            System.out.println("test2 false");
        }

        // nested if
        boolean test3 = true;
        String test_3 = "3";
        if (test3) {
            if (test_3.equals("3")) {
                System.out.println("test3 passed");
            }
        }

        // switch statement

        char grade = 'A';
        switch (grade) {
            case 'A':
                System.out.println("Excellent");
                break;
            case 'B':
            case 'C':
                System.out.println("well done");
                break;
            default:
                System.out.println("invaild grade");
        }
        System.out.println("test4 is " + grade);
    }
}
