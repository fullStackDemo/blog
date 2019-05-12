### Java - Character Class

##### Escape Sequences

| Escape Sequence |                         Description                         |
| :-------------- | :---------------------------------------------------------: |
| \t              |          Inserts a tab in the text at this point.           |
| \b              |       Inserts a backspace in the text at this point.        |
| \n              |        Inserts a newline in the text at this point.         |
| \r              |    Inserts a carriage return in the text at this point.     |
| \f              |       Inserts a form feed in the text at this point.        |
| \'              | Inserts a single quote character in the text at this point. |
| \"              | Inserts a double quote character in the text at this point. |
| \\              |  Inserts a backslash character in the text at this point.   |

##### Character methods

| Sr.No. | Method & Description                                         |
| :----- | :----------------------------------------------------------- |
| 1      | [isLetter()](https://www.tutorialspoint.com/java/character_isletter.htm)<br />Determines whether the specified char value is a letter. |
| 2      | [isDigit()](https://www.tutorialspoint.com/java/character_isdigit.htm)<br />Determines whether the specified char value is a digit. |
| 3      | [isWhitespace()](https://www.tutorialspoint.com/java/character_iswhitespace.htm)<br />Determines whether the specified char value is white space. |
| 4      | [isUpperCase()](https://www.tutorialspoint.com/java/character_isuppercase.htm)<br />Determines whether the specified char value is uppercase. |
| 5      | [isLowerCase()](https://www.tutorialspoint.com/java/character_islowercase.htm)<br />Determines whether the specified char value is lowercase. |
| 6      | [toUpperCase()](https://www.tutorialspoint.com/java/character_touppercase.htm)<br />Returns the uppercase form of the specified char value. |
| 7      | [toLowerCase()](https://www.tutorialspoint.com/java/character_tolowercase.htm)<br />Returns the lowercase form of the specified char value. |
| 8      | [toString()](https://www.tutorialspoint.com/java/character_tostring.htm)<br />Returns a String object representing the specified character value that is, a one-character string. |

**Example**

```java
package com.character;

public class Main {
  public static void main(String[] args) {
    char a = 'a';
    System.out.println(a);
    
    char[] arr = {'a', '\t', 'b'};
    System.out.println(arr);
    
    //判断是否是子母
    // false
    System.out.println(Character.isLetter('9'));
    // true
    System.out.println(Character.isLetter('u'));
    // true
    System.out.println(Character.isDigit('9'));
    // false
    System.out.println(Character.isDigit('p'));
    // true
    System.out.println(Character.isUpperCase('U'));
    // false
    System.out.println(Character.isUpperCase('9'));
    // true
    System.out.println(Character.isLowerCase('p'));
    // toUpperCase
    System.out.println(Character.toUpperCase('a'));
    System.out.println(Character.toLowerCase('H'));
    System.out.println(Character.toString('9'));
    System.out.println(Character.codePointAt(arr, 0));
  }
}

```

