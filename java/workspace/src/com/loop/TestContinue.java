package com.loop;

public class TestContinue {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40};

        for (int number : numbers) {
            if (number == 20) {
                continue;
            }
            System.out.println(number);
        }
    }
}
