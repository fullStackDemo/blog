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
| 8      | [static String copyValueOf(char[\] data, int offset, int count)](https://www.tutorialspoint.com/java/java_string_copyvalueof_dataoffsetcount.htm)Returns a String that represents the character sequence in the array specified. |
| 9      | [boolean endsWith(String suffix)](https://www.tutorialspoint.com/java/java_string_endswith.htm)Tests if this string ends with the specified suffix. |
| 10     | [boolean equals(Object anObject)](https://www.tutorialspoint.com/java/java_string_equals.htm)Compares this string to the specified object. |
| 11     | [boolean equalsIgnoreCase(String anotherString)](https://www.tutorialspoint.com/java/java_string_equalsignorecase.htm)Compares this String to another String, ignoring case considerations. |
| 12     | [byte getBytes()](https://www.tutorialspoint.com/java/java_string_getbytes.htm)Encodes this String into a sequence of bytes using the platform's default charset, storing the result into a new byte array. |
| 13     | [byte[\] getBytes(String charsetName)](https://www.tutorialspoint.com/java/java_string_getbytes_charsetname.htm)Encodes this String into a sequence of bytes using the named charset, storing the result into a new byte array. |
| 14     | [void getChars(int srcBegin, int srcEnd, char[\] dst, int dstBegin)](https://www.tutorialspoint.com/java/java_string_getchars.htm)Copies characters from this string into the destination character array. |
| 15     | [int hashCode()](https://www.tutorialspoint.com/java/java_string_hashcode.htm)Returns a hash code for this string. |
| 16     | [int indexOf(int ch)](https://www.tutorialspoint.com/java/java_string_indexof.htm)Returns the index within this string of the first occurrence of the specified character. |
| 17     | [int indexOf(int ch, int fromIndex)](https://www.tutorialspoint.com/java/java_string_indexof_fromindex.htm)Returns the index within this string of the first occurrence of the specified character, starting the search at the specified index. |
| 18     | [int indexOf(String str)](https://www.tutorialspoint.com/java/java_string_indexof_str.htm)Returns the index within this string of the first occurrence of the specified substring. |
| 19     | [int indexOf(String str, int fromIndex)](https://www.tutorialspoint.com/java/java_string_indexof_strfromindex.htm)Returns the index within this string of the first occurrence of the specified substring, starting at the specified index. |
| 20     | [String intern()](https://www.tutorialspoint.com/java/java_string_intern.htm)Returns a canonical representation for the string object. |
| 21     | [int lastIndexOf(int ch)](https://www.tutorialspoint.com/java/java_string_lastindexof.htm)Returns the index within this string of the last occurrence of the specified character. |
| 22     | [int lastIndexOf(int ch, int fromIndex)](https://www.tutorialspoint.com/java/java_string_lastindexof_chfromindex.htm)Returns the index within this string of the last occurrence of the specified character, searching backward starting at the specified index. |
| 23     | [int lastIndexOf(String str)](https://www.tutorialspoint.com/java/java_string_lastindexof_str.htm)Returns the index within this string of the rightmost occurrence of the specified substring. |
| 24     | [int lastIndexOf(String str, int fromIndex)](https://www.tutorialspoint.com/java/java_string_lastindexof_fromindex.htm)Returns the index within this string of the last occurrence of the specified substring, searching backward starting at the specified index. |
| 25     | [int length()](https://www.tutorialspoint.com/java/java_string_length.htm)Returns the length of this string. |
| 26     | [boolean matches(String regex)](https://www.tutorialspoint.com/java/java_string_matches.htm)Tells whether or not this string matches the given regular expression. |
| 27     | [boolean regionMatches(boolean ignoreCase, int toffset, String other, int ooffset, int len)](https://www.tutorialspoint.com/java/java_string_regionmatches_ignorecase.htm)Tests if two string regions are equal. |
| 28     | [boolean regionMatches(int toffset, String other, int ooffset, int len)](https://www.tutorialspoint.com/java/java_string_regionmatches.htm)Tests if two string regions are equal. |
| 29     | [String replace(char oldChar, char newChar)](https://www.tutorialspoint.com/java/java_string_replace.htm)Returns a new string resulting from replacing all occurrences of oldChar in this string with newChar. |
| 30     | [String replaceAll(String regex, String replacement](https://www.tutorialspoint.com/java/java_string_replaceall.htm)Replaces each substring of this string that matches the given regular expression with the given replacement. |
| 31     | [String replaceFirst(String regex, String replacement)](https://www.tutorialspoint.com/java/java_string_replacefirst.htm)Replaces the first substring of this string that matches the given regular expression with the given replacement. |
| 32     | [String[\] split(String regex)](https://www.tutorialspoint.com/java/java_string_split.htm)Splits this string around matches of the given regular expression. |
| 33     | [String[\] split(String regex, int limit)](https://www.tutorialspoint.com/java/java_string_split_regexlimit.htm)Splits this string around matches of the given regular expression. |
| 34     | [boolean startsWith(String prefix)](https://www.tutorialspoint.com/java/java_string_startswith.htm)Tests if this string starts with the specified prefix. |
| 35     | [boolean startsWith(String prefix, int toffset)](https://www.tutorialspoint.com/java/java_string_startswith_prefixtoffset.htm)Tests if this string starts with the specified prefix beginning a specified index. |
| 36     | [CharSequence subSequence(int beginIndex, int endIndex)](https://www.tutorialspoint.com/java/java_string_subsequence.htm)Returns a new character sequence that is a subsequence of this sequence. |
| 37     | [String substring(int beginIndex)](https://www.tutorialspoint.com/java/java_string_substring.htm)Returns a new string that is a substring of this string. |
| 38     | [String substring(int beginIndex, int endIndex)](https://www.tutorialspoint.com/java/java_string_substring_beginendindex.htm)Returns a new string that is a substring of this string. |
| 39     | [char[\] toCharArray()](https://www.tutorialspoint.com/java/java_string_tochararray.htm)Converts this string to a new character array. |
| 40     | [String toLowerCase()](https://www.tutorialspoint.com/java/java_string_tolowercase.htm)Converts all of the characters in this String to lower case using the rules of the default locale. |
| 41     | [String toLowerCase(Locale locale)](https://www.tutorialspoint.com/java/java_string_tolowercase_locale.htm)Converts all of the characters in this String to lower case using the rules of the given Locale. |
| 42     | [String toString()](https://www.tutorialspoint.com/java/java_string_tostring.htm)This object (which is already a string!) is itself returned. |
| 43     | [String toUpperCase()](https://www.tutorialspoint.com/java/java_string_touppercase.htm)Converts all of the characters in this String to upper case using the rules of the default locale. |
| 44     | [String toUpperCase(Locale locale)](https://www.tutorialspoint.com/java/java_string_touppercase_locale.htm)Converts all of the characters in this String to upper case using the rules of the given Locale. |
| 45     | [String trim()](https://www.tutorialspoint.com/java/java_string_trim.htm)Returns a copy of the string, with leading and trailing whitespace omitted. |
| 46     | [static String valueOf(primitive data type x)](https://www.tutorialspoint.com/java/java_string_valueof.htm)Returns the string representation of the passed data type argument. |