package com.zz.controllers;

import java.util.TreeSet;
import java.util.Iterator;

public class TestStu implements Comparable<Object> {
    
    String name;
    long id;
    
    public TestStu(String name, long id) {
        this.id = id;
        this.name = name;
    }
    
    public int compareTo(Object o) {
        TestStu testStu = (TestStu) o;
        int result = id > testStu.id ? 1 : (id == testStu.id ? 0 : -1);
        return result;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getName() {
        return this.name;
    }
    
    public void setId(long id) {
        this.id = id;
    }
    
    public Long getId() {
        return this.id;
    }
    
    
    public static void main(String[] args) {
        TestStu testStu1 = new TestStu("li1", 11);
        TestStu testStu2 = new TestStu("li2", 12);
        TestStu testStu3 = new TestStu("li3", 13);
        TestStu testStu4 = new TestStu("li4", 14);
    
        TreeSet<TestStu> treeSet = new TreeSet<>();
        treeSet.add(testStu1);
        treeSet.add(testStu3);
        treeSet.add(testStu2);
        treeSet.add(testStu4);
    
        Iterator<TestStu> iterator = treeSet.iterator();
        System.out.println("Set集合里面所有元素");
        
        while (iterator.hasNext()){
            TestStu testStu = iterator.next();
            System.out.println(testStu.getName() + "---" + testStu.getId());
        }
        System.out.println("截取2之前的元素");
        iterator = treeSet.headSet(testStu2).iterator();
        while (iterator.hasNext()){
            TestStu testStu = iterator.next();
            System.out.println(testStu.getName() + "---" + testStu.getId());
        }
        System.out.println("截取2之后的元素");
        iterator = treeSet.tailSet(testStu2).iterator();
        while (iterator.hasNext()){
            TestStu testStu = iterator.next();
            System.out.println(testStu.getName() + "---" + testStu.getId());
        }
        System.out.println("截取2和4之间的元素");
        iterator = treeSet.subSet(testStu2, testStu4).iterator();
        while (iterator.hasNext()){
            TestStu testStu = iterator.next();
            System.out.println(testStu.getName() + "---" + testStu.getId());
        }
    
    
    }
    
}
