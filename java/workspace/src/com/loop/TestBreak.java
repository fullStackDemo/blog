package com.loop;

public class TestBreak {
    public static void main(String[] args) {
        int arr[] = {10, 20, 30};

        for (int n : arr) {
            if (n == 30) {
                break;
            }
            System.out.println(n);
        }
    }
}
