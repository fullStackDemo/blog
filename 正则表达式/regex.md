## 正则表达式 ##

正则还是很重要的,记录一些容易忘记的知识点。

[在线测试平台](https://regex101.com/r/cO8lqs/23) 

## `Basic topics`  ##

### Anchors — `^ and $` ###
 
> `^The`  ----->   matches any string that starts with The


~~~js 

var str = 'The end';

var rgx = /^The/g;

str.match(rgx)  ==> ['The'] 

~~~

> `end$` ----->   matches a string that ends with end

~~~js

var str = 'The end';
  
var rgx = /end$/g;

str.match(rgx)  ==> ['end']

~~~

> `^The end$` ---->  exact string match (starts and ends with The end)

~~~js

var str = 'The end';
  
var rgx = /^The end$/g;

str.match(rgx)  ==> ['The end']

~~~

### Quantifiers —  `* + ? and {}` ###

> `abc*`  ----->  matches a string that has ab followed by zero or more c 

~~~js

var str = 'ab abc abcc';
  
var rgx = /abc*/g;

str.match(rgx)  ==> ["ab", "abc", "abcc"]

~~~

> `abc+`  ---->      matches a string that has ab followed by one or more c

~~~js

var str = 'ab abc abcc';
  
var rgx = /abc+/g;

str.match(rgx)  ==> ["abc", "abcc"]

~~~

> `abc?`  ---->  matches a string that has ab followed by zero or one c

~~~js

var str = 'ab abc abcc';
  
var rgx = /abc?/g;

str.match(rgx)  ==> ["ab", "abc", "abc"]

~~~

> abc{2} --->  matches a string that has ab followed by 2 c

~~~js

var str = 'ab abc abcc';
  
var rgx = /abc{2}/g;

str.match(rgx)  ==> ["abc"]

~~~

> `abc{2,}` --->  matches a string that has ab followed by 2 or more c

~~~js

var str = 'ab abc abcc abccc';
  
var rgx = /abc{2,}/g;

str.match(rgx)  ==> ["abcc", "abccc"]

~~~

> `abc{2,5}` --->  matches a string that has ab followed by 2 up to 5 c

~~~js

var str = 'ab abc abcc abccc abccccc abcccc';
  
// 2,5中间不能用空格 否则不生效  
var rgx = /abc{2,5}/g;

str.match(rgx)  ==> ["abcc", "abccc", "abccccc", "abcccc"]

~~~

> `a(bc)*` ---> matches a string that has a followed by zero or more copies of the sequence bc

~~~js

var str = 'ab abc abcc abccc';
  
var rgx = /a(bc)*/g;

str.match(rgx)  ==> ["a", "abc", "abc", "abc"]

~~~

> `a(bc){2,5}` ---> matches a string that has a followed by 2 up to 5 copies of the sequence bc 


~~~js

var str = 'ab abc abcbc abcbcbc, abcbcbcbcbcbcbc';
  
var rgx = /a(bc){2,5}/g;

str.match(rgx)  ==>  ["abcbc", "abcbcbc", "abcbcbcbcbc"]

~~~

### OR operator — `| or []` ###

> `a(b|c)` --->  matches a string that has a followed by b or c


~~~js

var str = 'ab abc abcc abccc';
  
var rgx = /a(b|c)/g;

str.match(rgx)  ==> ["ab", "ab", "ab", "ab"]

~~~

> `a[bc]` --->   same as previous

~~~js

var str = 'ab abc abcc abccc';
  
var rgx = /a[bc]/g;

str.match(rgx)  ==> ["ab", "ab", "ab", "ab"]

~~~

### Character classes — `\d \w \s and .` ###

> `\d`  --->   matches a single character that is a digit 

~~~js

var str = 'ab abc abcc abccc 899';
  
var rgx = /\d/g;

str.match(rgx)  ==> ["8", "9", "9"]

~~~

> `\D`  --->  matches a single non-digit character 

~~~js

//和 `\d` 相反
var str = 'ab abc abcc abccc 899';
  
var rgx = /\D/g;

str.match(rgx)  ==> ["a", "b", " ", "a", "b", "c", " ", "a", "b", "c", "c", " ", "a", "b", "c", "c", "c", " "]

~~~

> `\w` ---> matches a word character (alphanumeric character plus underscore)

~~~js

//字母数字下划线
var str = 'ab_ 899';
  
var rgx = /\w/g;

str.match(rgx)  ==> ["a", "b", "_", "8", "9", "9"]

~~~

> `\W` ---> matches a no word character (no alphanumeric character plus underscore)

~~~js

var str = 'ab_ 899';
  
var rgx = /\W/g;

str.match(rgx)  ==> [" "]

~~~

> `\s` ---> matches a whitespace character (includes tabs and line breaks) 

~~~js

//空格 tab
var str = 'ab_ 899';
  
var rgx = /\s/g;

str.match(rgx)  ==> [" "]

~~~

> `\S` ---> matches a no whitespace character (includes no tabs and line breaks) 

~~~js

var str = 'ab_ 899';
  
var rgx = /\S/g;

str.match(rgx)  ==> ["a", "b", "_", "8", "9", "9"]

~~~

> `.` ---> matches any character

~~~js

var str = 'ab_ 899 ac';
  
var rgx = /a./g;

str.match(rgx)  ==> ["ab", "ac"]

~~~

> `^.[$()|*+?{\` -----> 匹配特殊字符 需要使用反斜杠 \

~~~js

var str = 'ab_ 899 a.c a$ a| a\ a?';
  
var rgx = /a[\.\$\|\?\\]/g;

str.match(rgx)  ==> ["a.", "a$", "a|", "a?"]

~~~

> 需要注意一些不打印的字符比如 tabs `\t`, new-lines `\n`, carriage returns `\r`.


### Flags ###


* `g (global)` does not return after the first match, restarting the subsequent searches from the end of the previous match

  全局匹配 `g` 会一直搜索所有结果 最后返回。
 
~~~js

var str = 'ab ac';
  
var rgx = /a/g;

str.match(rgx)  ==>  ["a", "a"]

~~~

* `m (multi-line)` when enabled ^ and $ will match the start and end of a line, instead of the whole string

  多行匹配 `m`, 当启用`^`和`$`将匹配一行的开始和结束,而不是整个字符串
  
~~~js

var str = 'ab ac';
  
var rgx = /^a/mg;

str.match(rgx)  ==>  ["a"]

~~~

* `i (insensitive)` makes the whole expression case-insensitive (for instance `/aBc/i` would match `AbC`)

  忽略大小写 `i` 
 
~~~js

var str = 'ab ac';
  
var rgx = /^A/ig;

str.match(rgx)  ==>  ["a"]

~~~

## Intermediate topics ##

### Grouping and capturing — `()` ###

> `a(bc)` ---> parentheses create a capturing group with value `bc`

~~~js

var str = 'abc ac';
  
var rgx = /a(bc)/g;

str.match(rgx)  ==>  ["abc"]

~~~

> `a(?:bc)*` --->  using `?:` we disable the capturing group

~~~js

var str = 'abc ac abcbc';
  
var rgx = /a(?:bc)*/g;

str.match(rgx)  ==>  ["abc"]

~~~

假设：
~~~js
http://stackoverflow.com/
https://stackoverflow.com/questions/tagged/regex
(https?|ftp):\/\/([^\/\r\n]+)(\/[^\r\n]*)?
~~~
会看到
 

~~~js

Match "http://stackoverflow.com/"
     Group 1: "http"
     Group 2: "stackoverflow.com"
     Group 3: "/"

Match "https://stackoverflow.com/questions/tagged/regex"
     Group 1: "https"
     Group 2: "stackoverflow.com"
     Group 3: "/questions/tagged/regex"

~~~

But I don't care about the protocol -- I just want the host and path of the URL. So, I change the regex to include the non-capturing group (?:).

~~~js
(?:https?|ftp):\/\/([^\/\r\n]+)(\/[^\r\n]*)?
~~~

Now, my result looks like this:

~~~js
Match "http://stackoverflow.com/"
     Group 1: "stackoverflow.com"
     Group 2: "/"

Match "https://stackoverflow.com/questions/tagged/regex"
     Group 1: "stackoverflow.com"
     Group 2: "/questions/tagged/regex"
~~~

看到了吗?第一组没有被捕获。解析器使用它来匹配的文本,但之后在最终结果忽略了它

> `a(?<foo>bc)` --->  using `?<foo>` we put a name to the group

  为 `bc` 这个`group`起名字叫做 `foo`
  
~~~js
'abc'.match(/a(?<foo>bc)/g)

Full matcth: abc
Group `foo`:	bc  
  
'abc'.match(/a(bc)/g)

Full matcth: abc
Group 1:	bc  
~~~

### Bracket expressions — `[]` ###

> `[abc]` ---> matches a string that has either an a or a b or a c -> is the same as `a|b|c`

> [a-c] --> same as previous

~~~js

var str = 'abc ac abcbc';
  
var rgx = /[abc]|[a-c]/g;

str.match(rgx)  ==>   ["a", "b", "c", "a", "c", "a", "b", "c", "b", "c"]

~~~

> `[a-fA-F0-9]` ---> a string that represents a single hexadecimal digit, case insensitively

~~~js

var str = 'abc 0999 op';
  
var rgx = /[a-fA-F0-9]/g;

str.match(rgx)  ==>  ["a", "b", "c", "0", "9", "9", "9"] 

~~~

> `[0-9]%` ---> a string that has a character from 0 to 9 before a % sign

~~~js

var str = 'ab%c 0999% op';
  
var rgx = /[a-fA-F0-9]%/g;

str.match(rgx)  ==>  ["a", "b", "c", "0", "9", "9", "9"] 

~~~

> `[^a-zA-Z]` ---->  a string that has not a letter from a to z or from A to Z. In this case the `^` is used as negation of the expression

  之前讲 `^a` 是必须匹配以此 `a` 为开头的内容, 如果加上`[]`
  `[^a]`就是匹配除了 `a` 以外的内容
  
~~~js

var str = 'ab%c 0999% op';
  
var rgx = /^[a-f]/g;

str.match(rgx)  ==>  ["a"]

\\比较一下

var str = 'ab%c 0999% op';
  
var rgx = /[^a-f]/g;

str.match(rgx)  ==>  ["%", " ", "0", "9", "9", "9", "%", " ", "o", "p"]

~~~

### Greedy and Lazy match 贪婪和懒惰匹配 ###

The quantifiers `( * + {})` are greedy operators, so they expand the match as far as they can through the provided text.

For example, `<.+>`matches `<div>simple div</div>` in `This is a <div>simple div</div>test`. In order to catch only the div tag we can use a ? to make it lazy:


~~~js

var str = 'This is a <div>simple div</div>test';
  
var rgx = /<.+>/g;

str.match(rgx)  ==>  ["<div>simple div</div>"]

//?

var str = 'This is a <div>simple div</div>test';
  
var rgx = /<.+?>/g;

str.match(rgx)  ==>  ["<div>", "</div>"]

~~~

Notice that a better solution should avoid the usage of `.` in favor of a more strict regex:

> `<[^<>]+> ` ---> matches any character except `< `or `>` one or more times included inside `<` and `>` 

~~~js

var str = 'This is a <div>simple div</div>test';
  
var rgx = /<[^<>]+>/g;

str.match(rgx)  ==>  ["<div>", "</div>"]

~~~

## Advanced topics ##

### Boundaries — `\b` and `\B` ###

> `\babc\b` ----->   performs a "whole words only" search

~~~js

//匹配单独字符串 独自的 要么最开始要么前后有空格

var str = 'This is a <div>simple div</div>test';
  
var rgx = /\ba\b/g;

str.match(rgx)  ==>  ["<div>", "</div>"]

//compare

var str = 'This is a <div>simple div</div>test';
  
var rgx = /\bd\b/g;

str.match(rgx)  ==>  null

~~~

> `\B` 和 `\b`相反 前后必须被字母或者数字（不能是特殊字符）包围着
> 
~~~js

var str = 'd This is a <div>simple div</div>test';
  
var rgx = /\Bd\B/g;

str.match(rgx)  ==>  null

//compare

var str = 'd This is a <div>simple ddiv</div>test';
  
var rgx = /\Bd\B/g;

str.match(rgx)  ==>  ["d"]

~~~

### Back-references — `\1` ###

> `([abc])\1` ---> using `\1` it matches the same text that was matched by the first capturing group 

~~~js

//简单意思就是 重复前面的匹配 多一个和前面一样的占位符

var str = 'abcd aa bb cc';
  
var rgx = /([abc])\1/g;

str.match(rgx)  ==>  ["aa", "bb", "cc"]


~~~

> `([abc])([de])\2\1` --->      we can use \2 (\3, \4, etc.) to identify the same text that was matched by the second (third, fourth, etc.) capturing group

~~~js

//简单意思就是 重复前面的匹配 多一个和前面一样的占位符

var str = 'abcd aa bb cc a2a b2b';
  
var rgx = /([abc])([\d])\1/g;

str.match(rgx)  ==>  ["a2a", "b2b"]

//多个

var str = 'abcd aa bb cc a2a b2b a22a b22b';
  
var rgx = /([abc])([\d])\2\1/g;

str.match(rgx)  ==>  ["a22a", "b22b"]

~~~

> `(?<foo>[abc])\k<foo>` --->   we put the name foo to the group and we reference it later (`\k<foo>`). The result is the same of the first regex

  给 `[abc]` group 命名 foo， `\k<foo>`匹配刚才 foo 匹配的内容
  
~~~js

//简单意思就是 重复前面的匹配 多一个和前面一样的占位符

var str = 'abcd aa bb cc a2a b2b';
  
var rgx = /(?<foo>[abc])\k<foo>/g;

str.match(rgx)  ==>  ["aa", "bb", "cc"]

~~~

### Look-ahead and Look-behind — `(?=)` and `(?<=)` ###

> `d(?=r)` ---> matches a d only if is followed by r, but r will not be part of the overall regex match
> 
~~~js

//简单意思就是 匹配后面跟个 r 的

var str = 'abcd aa bb d dr dr cc a2a b2b';
  
var rgx = /d(?=r)/g;

str.match(rgx)  ==>  ["d", "d"]

~~~

> `(?<=r)d` ---> matches a d only if is preceded by an r, but r will not be part of the overall regex match

~~~js

//简单意思就是 匹配前面跟个 r 的

var str = 'abcd aa bb d dr dr rd cc a2a b2b';
  
var rgx = /(?<=r)d/g;

str.match(rgx)  ==>  ["d"]

~~~

> `d(?!r)` ---> matches a d only if is not followed by r, but r will not be part of the overall regex match

~~~js

//简单意思就是 匹配后面不跟个 r 的

var str = 'abcd aa bb d dr cc a2a b2b';
  
var rgx = /d(?!r)/g;

str.match(rgx)  ==>  ["d", "d"]

~~~

> `(?<!r)d` ---> matches a d only if is not preceded by an r, but r will not be part of the overall regex match

~~~js

//简单意思就是 匹配前面不跟个 r 的

var str = 'abcd aa bb d dr dr rd cc a2a b2b';
  
var rgx = /(?<!r)d/g;

str.match(rgx)  ==>   ["d", "d", "d", "d"]

~~~


## 常用正则 ##

### HTML Tag —  [try it](https://regex101.com/r/cO8lqs/9067)  ###

Matches any valid HTML tag and the corresponding closing tag

~~~js

var str = '<a>8888 <b>666</b></a> eeee <span>0000</span><b>99</b>';
  
var rgx = /<([a-z]+)([^>]+)*(?:>(.*)<\/\1|\s+\/>)/g;

str.match(rgx)  ==> ["<a>8888 <b>666</b></a", "<span>0000</span", "<b>99</b"]

~~~

### 获取url中参数value  [try it](https://regex101.com/r/vRX52G/2/) ###

~~~js

(\\?|(?<=&))(address|name|age)=([^&]*)((?=&)|$)

https://regex101.com?name=alex&age=21&address=us

~~~

~~~js

var str = 'https://regex101.com?name=alex&age=21&address=us';

var rgx = /(\\?|(?<=&))(address|name|age)=([^&]*)((?=&)|$)/g;

str.match(rgx) ==> ["name=alex", "age=21", "address=us"]

~~~


