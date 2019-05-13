### Java - String class

#### String Methods

| Sr.No. | Method & Description                                         |
| :----- | :----------------------------------------------------------- |
| 1      | [char charAt(int index)](https://www.tutorialspoint.com/java/java_string_charat.htm)<br />Returns the character at the specified index.返回指定索引的字符 |
| 2      | [int compareTo(Object o)](https://www.tutorialspoint.com/java/java_string_compareto.htm)<br />Compares this String to another Object.字符串和一个对象进行比较，返回int |
| 3      | [int compareTo(String anotherString)](https://www.tutorialspoint.com/java/java_string_compareto_anotherstring.htm)<br />Compares two strings lexicographically. 字典排序法比较两个字符串，返回int |
| 4      | [int compareToIgnoreCase(String str)](https://www.tutorialspoint.com/java/java_string_comparetoignorecase.htm)<br />Compares two strings lexicographically, ignoring case differences.忽略大小写，字典排序法比较两个字符串 |
| 5      | [String concat(String str)](https://www.tutorialspoint.com/java/java_string_concat.htm)<br />Concatenates the specified string to the end of this string.字符串连接 |
| 6      | [boolean contentEquals(StringBuffer sb)](https://www.tutorialspoint.com/java/java_string_contentequals.htm)<br />Returns true if and only if this String represents the same sequence of characters as the specified StringBuffer.判断内容是否相等 |
| 7      | [static String copyValueOf(char[\] data)<br />](https://www.tutorialspoint.com/java/java_string_copyvalueof.htm)Returns a String that represents the character sequence in the array specified.复制char数组的内容，返回一个新的字符串 |
| 8      | [static String copyValueOf(char[\] data, int offset, int count)](https://www.tutorialspoint.com/java/java_string_copyvalueof_dataoffsetcount.htm)<br />Returns a String that represents the character sequence in the array specified.复制指定索引开始，指定长度的字符串 |
| 9      | [boolean endsWith(String suffix)](https://www.tutorialspoint.com/java/java_string_endswith.htm)<br />Tests if this string ends with the specified suffix.测试字符串是否以指定后缀结束 |
| 10     | [boolean equals(Object anObject)](https://www.tutorialspoint.com/java/java_string_equals.htm)<br />Compares this string to the specified object.判断是否相等 |
| 11     | [boolean equalsIgnoreCase(String anotherString)](https://www.tutorialspoint.com/java/java_string_equalsignorecase.htm)<br />Compares this String to another String, ignoring case considerations.判断是否相等，并且忽略大小写 |
| 12     | [byte getBytes()](https://www.tutorialspoint.com/java/java_string_getbytes.htm)<br />Encodes this String into a sequence of bytes using the platform's default charset, storing the result into a new byte array.以默认的编码格式解码一定的顺序的字节数组，并生成一个新的字节数组。 |
| 13     | [byte[\] getBytes(String charsetName)](https://www.tutorialspoint.com/java/java_string_getbytes_charsetname.htm)<br />Encodes this String into a sequence of bytes using the named charset, storing the result into a new byte array.以一定的编码格式解码一定的顺序的字节数组，并生成一个新的字节数组。 |
| 14     | [void getChars(int srcBegin, int srcEnd, char[\] dst, int dstBegin)](https://www.tutorialspoint.com/java/java_string_getchars.htm)<br />Copies characters from this string into the destination character array.从一个字符串复制字符到目标字符数组。 |
| 15     | [int hashCode()](https://www.tutorialspoint.com/java/java_string_hashcode.htm)<br />Returns a hash code for this string.返回一个字符串的哈希码值 |
| 16     | [int indexOf(int ch)](https://www.tutorialspoint.com/java/java_string_indexof.htm)<br />Returns the index within this string of the first occurrence of the specified character.返回指定字符的索引 |
| 17     | [int indexOf(int ch, int fromIndex)](https://www.tutorialspoint.com/java/java_string_indexof_fromindex.htm)<br />Returns the index within this string of the first occurrence of the specified character, starting the search at the specified index.返回从固定索引开始查找的指定字符的索引值 |
| 18     | [int indexOf(String str)](https://www.tutorialspoint.com/java/java_string_indexof_str.htm)<br />Returns the index within this string of the first occurrence of the specified substring.查找指定字符串第一次开始的索引值 |
| 19     | [int indexOf(String str, int fromIndex)](https://www.tutorialspoint.com/java/java_string_indexof_strfromindex.htm)<br />Returns the index within this string of the first occurrence of the specified substring, starting at the specified index.查找子字符串从固定索引值开始查找第一次出现的索引位置。 |
| 20     | [String intern()](https://www.tutorialspoint.com/java/java_string_intern.htm)<br />Returns a canonical representation for the string object.返回字符串对象的规范性表示。 |
| 21     | [int lastIndexOf(int ch)](https://www.tutorialspoint.com/java/java_string_lastindexof.htm)<br />Returns the index within this string of the last occurrence of the specified character.获取指定字符最后出现的索引位置 |
| 22     | [int lastIndexOf(int ch, int fromIndex)](https://www.tutorialspoint.com/java/java_string_lastindexof_chfromindex.htm)<br />Returns the index within this string of the last occurrence of the specified character, searching backward starting at the specified index.如果指定字符在0～fromIndex 内则返回索引位置，如果不在则返回 -1 |
| 23     | [int lastIndexOf(String str)<br />](https://www.tutorialspoint.com/java/java_string_lastindexof_str.htm)Returns the index within this string of the rightmost occurrence of the specified substring.获取指定字符最后出现的索引位置 |
| 24     | [int lastIndexOf(String str, int fromIndex)](https://www.tutorialspoint.com/java/java_string_lastindexof_fromindex.htm)<br />Returns the index within this string of the last occurrence of the specified substring, searching backward starting at the specified index.如果指定字符串在0～fromIndex 内则返回索引位置，如果不在则返回 -1 |
| 25     | [int length()](https://www.tutorialspoint.com/java/java_string_length.htm)<br />Returns the length of this string.返回长度 |
| 26     | [boolean matches(String regex)](https://www.tutorialspoint.com/java/java_string_matches.htm)<br />Tells whether or not this string matches the given regular expression.是否匹配字符串正则表达式 |
| 27     | [boolean regionMatches(boolean ignoreCase, int toffset, String other, int ooffset, int len)](https://www.tutorialspoint.com/java/java_string_regionmatches_ignorecase.htm)<br />Tests if two string regions are equal.判断两个字符串区域是否相等 |
| 28     | [boolean regionMatches(int toffset, String other, int ooffset, int len)](https://www.tutorialspoint.com/java/java_string_regionmatches.htm)<br />Tests if two string regions are equal.判断两个字符串区域是否相等 |
| 29     | [String replace(char oldChar, char newChar)](https://www.tutorialspoint.com/java/java_string_replace.htm)<br />Returns a new string resulting from replacing all occurrences of oldChar in this string with newChar.用新的字符替换所有老字符，并返回一个新的字符串 |
| 30     | [String replaceAll(String regex, String replacement](https://www.tutorialspoint.com/java/java_string_replaceall.htm)<br />Replaces each substring of this string that matches the given regular expression with the given replacement.正则匹配替换字符串 |
| 31     | [String replaceFirst(String regex, String replacement)](https://www.tutorialspoint.com/java/java_string_replacefirst.htm)<br />Replaces the first substring of this string that matches the given regular expression with the given replacement.正则匹配替换第一个字符串 |
| 32     | [String[\] split(String regex)](https://www.tutorialspoint.com/java/java_string_split.htm)<br />Splits this string around matches of the given regular expression.正则匹配分割字符串 |
| 33     | [String[\] split(String regex, int limit)](https://www.tutorialspoint.com/java/java_string_split_regexlimit.htm)<br />Splits this string around matches of the given regular expression.正则匹配分割字符串，并且限制返回字符串个数 |
| 34     | [boolean startsWith(String prefix)](https://www.tutorialspoint.com/java/java_string_startswith.htm)<br />Tests if this string starts with the specified prefix. 判断是否以指定前缀字符串开始 |
| 35     | [boolean startsWith(String prefix, int toffset)](https://www.tutorialspoint.com/java/java_string_startswith_prefixtoffset.htm)<br />Tests if this string starts with the specified prefix beginning a specified index.从指定索引位置开始，判断是否以指定前缀字符串开始 |
| 36     | [CharSequence subSequence(int beginIndex, int endIndex)](https://www.tutorialspoint.com/java/java_string_subsequence.htm)<br />Returns a new character sequence that is a subsequence of this sequence.返回新的一个当前字符序列的一个子序列 |
| 37     | [String substring(int beginIndex)](https://www.tutorialspoint.com/java/java_string_substring.htm)<br />Returns a new string that is a substring of this string.返回当前字符串的一个新的子字符串 |
| 38     | [String substring(int beginIndex, int endIndex)](https://www.tutorialspoint.com/java/java_string_substring_beginendindex.htm)<br />Returns a new string that is a substring of this string.返回当前字符串的一个新的子字符串 |
| 39     | [char[\] toCharArray()](https://www.tutorialspoint.com/java/java_string_tochararray.htm)<br />Converts this string to a new character array.转换字符串为新的字符数组 |
| 40     | [String toLowerCase()](https://www.tutorialspoint.com/java/java_string_tolowercase.htm)<br />Converts all of the characters in this String to lower case using the rules of the default locale.使用默认本地规则格式化字符为小写 |
| 41     | [String toLowerCase(Locale locale)](https://www.tutorialspoint.com/java/java_string_tolowercase_locale.htm)<br />Converts all of the characters in this String to lower case using the rules of the given Locale.使用提供的规则格式化字符为小写 |
| 42     | [String toString()](https://www.tutorialspoint.com/java/java_string_tostring.htm)<br />This object (which is already a string!) is itself returned.以字符串返回 |
| 43     | [String toUpperCase()](https://www.tutorialspoint.com/java/java_string_touppercase.htm)<br />Converts all of the characters in this String to upper case using the rules of the default locale.使用默认本地规则格式化字符为大写 |
| 44     | [String toUpperCase(Locale locale)](https://www.tutorialspoint.com/java/java_string_touppercase_locale.htm)<br />Converts all of the characters in this String to upper case using the rules of the given Locale.使用提供的规则格式化字符为大写 |
| 45     | [String trim()](https://www.tutorialspoint.com/java/java_string_trim.htm)<br />Returns a copy of the string, with leading and trailing whitespace omitted.返回删除前后空格后的一个副本 |
| 46     | [static String valueOf(primitive data type x)](https://www.tutorialspoint.com/java/java_string_valueof.htm)<br />Returns the string representation of the passed data type argument.根据参数数据类型返回代表当前字符串的数据 |

**Example**

```java
package com.String;

public class Main {
  public static void main(String[] args) {
    char[] str = {'1', 'a', '2', 'b'};
    String hstr = new String(str);
    System.out.println(hstr + " " + hstr.length());
    hstr = "99";
    // concat 生成新的字符串
    String newStr = hstr.concat(" hello world");
    System.out.println(hstr);
    System.out.println(newStr);
    
    String fs;
    fs = String.format("The value of the float variable is " +
            "%f, while the value of the integer " +
            "variable is %d, and the string " +
            "is %s", 1.00, 2, "88");
    System.out.println(fs);
    System.out.println("-----------------");
    // methods
    String s = "Strings are immutable";
    
    // charAt()
    // r
    System.out.println(s.charAt(2));
    // compareTo
    String s1 = new String("Strings are immutable");
    // 0
    System.out.println(s.compareTo(s1));
    // true
    System.out.println(s1.equals(s));
    String s2 = new String("88Strings 99are immutable");
    // 27
    System.out.println(s.compareTo(s2));
    
    // 0 忽略大小写
    System.out.println(s.compareToIgnoreCase(s1.toUpperCase()));
    
    // 字符串连接
    System.out.println(s.concat(s2));
    
    // 判断内容是否相等
    System.out.println(s.contentEquals(s1));
    
    char[] s3 = {'1', 'b', 'c'};
    // 1bc
    System.out.println(s1.copyValueOf(s3));
    //Strings are immutable
    System.out.println(s1);
    // c
    System.out.println(s1.copyValueOf(s3, 2, 1));
    
    // 判断是否以固定后缀结尾
    System.out.println(s.endsWith("able"));
    System.out.println(s.equalsIgnoreCase(s1));
    
    // 获取固定编码生成的字节数组
    System.out.println(s.getBytes());
    byte[] bytes = s.getBytes();
    for (byte b : bytes) {
      byte[] single = {b};
      int index = s.indexOf(new String(single));
      System.out.print(index);
      System.out.print(" -- ");
      System.out.print(s.charAt(index));
      System.out.print(" -- ");
      System.out.print(b);
      System.out.print(" -- ");
      System.out.println(new String(single));
    }
    
    // 复制字符到字符数组
    char[] dist = {' ', '1', '2', ' ', ' ', ' ', ' ', ' ', ' '};
    s.getChars(0, 6, dist, 2);
    // "String"
    System.out.println(dist);
    System.out.println(dist.length);
    for (char c : dist) {
      System.out.println(c);
    }
    
    // hashcode
    System.out.println(s.hashCode());
    System.out.println(s1.hashCode());
    
    System.out.println(s.indexOf("tr"));
    System.out.println(s.indexOf("tr", 4));
    
    System.out.println(s.intern());
    // 17
    System.out.println(s.lastIndexOf('a'));
    // 17
    System.out.println(s.lastIndexOf('a', 18));
    // 3
    System.out.println(s.lastIndexOf('i', 3));
    // -1
    System.out.println(s.lastIndexOf('s', 3));
    // 8
    System.out.println(s.lastIndexOf("are"));
    // -1
    System.out.println(s.lastIndexOf("are", 2));
    
    // regexp 匹配
    System.out.println(s.matches(".*"));
    
    // true 区域字符串进行比较
    System.out.println(s.regionMatches(true, 0, "String", 0, 5));
    
    // 简单替换
    System.out.println(s.replace('e', '9'));
    // 正则替换
    //Strings 00 immutable
    System.out.println(s.replaceAll("(are)", "00"));
    //Strings ar77 immutable
    System.out.println(s.replaceFirst("e", "77"));
    
    // 分割字符串
    //{'Strings ar', 'immutabl'}
    String[] splitStr = s.split("e");
    // Strings ar
    // immutabl
    for (String _s : splitStr) {
      System.out.println(_s);
    }
    
    // limit 限制返回几个字符串
    System.out.println(s.split("e", 5));
    /*
     * Strings
     * re immut
     * ble
     * */
    for (String _s1 : s.split("a", 3)) {
      System.out.println(_s1);
    }
    
    // 判断是否以什么为开头
    System.out.println(s.startsWith("s"));
    // true
    System.out.println(s.startsWith("S"));
    // toffset 开始搜索的索引值
    // false
    System.out.println(s.startsWith("S", 2));
    
    // 生成一个子字符序列
    System.out.println(s.subSequence(0, 2));
    // rings are immutable
    System.out.println(s.substring(2));
    // ri
    System.out.println(s.substring(2, 4));
    
    // 生成新的字符数组
    System.out.println(s.toCharArray());
    for (char c : s.toCharArray()) {
      System.out.println(c);
    }
  
    System.out.println(s.toUpperCase());
    System.out.println(s.toLowerCase());
  
    System.out.println(" 1233 7".trim());
    
  }
}

```

**Output**

```java

-----------------
r
0
true
27
0
Strings are immutable88Strings 99are immutable
true
1bc
Strings are immutable
c
true
true
[B@254989ff
0 -- S -- 83 -- S
1 -- t -- 116 -- t
2 -- r -- 114 -- r
3 -- i -- 105 -- i
4 -- n -- 110 -- n
5 -- g -- 103 -- g
6 -- s -- 115 -- s
7 --   -- 32 --  
8 -- a -- 97 -- a
2 -- r -- 114 -- r
10 -- e -- 101 -- e
7 --   -- 32 --  
3 -- i -- 105 -- i
13 -- m -- 109 -- m
13 -- m -- 109 -- m
15 -- u -- 117 -- u
1 -- t -- 116 -- t
8 -- a -- 97 -- a
18 -- b -- 98 -- b
19 -- l -- 108 -- l
10 -- e -- 101 -- e
 1String 
9
 
1
S
t
r
i
n
g
 
-1208780424
-1208780424
1
-1
Strings are immutable
17
17
3
-1
8
-1
true
true
Strings ar9 immutabl9
Strings 00 immutable
Strings ar77 immutable
Strings ar
 immutabl
[Ljava.lang.String;@37f8bb67
Strings 
re immut
ble
false
true
false
St
rings are immutable
ri
Strings are immutable
S
t
r
i
n
g
s
 
a
r
e
 
i
m
m
u
t
a
b
l
e
STRINGS ARE IMMUTABLE
strings are immutable
1233 7

Process finished with exit code 0

```

