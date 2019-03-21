## 正则表达式 ##

正则还是很重要的,记录一些基本容易忘记的知识点。

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

> abc{2,} --->  matches a string that has ab followed by 2 or more c

~~~js
var str = 'ab abc abcc abccc';
  
var rgx = /abc{2,}/g;

str.match(rgx)  ==> ["abcc", "abccc"]

~~~

> abc{2,5} --->  matches a string that has ab followed by 2 up to 5 c

~~~js
var str = 'ab abc abcc abccc abccccc abcccc';
  
// 2,5中间不能用空格 否则不生效  
var rgx = /abc{2,5}/g;

str.match(rgx)  ==> ["abcc", "abccc", "abccccc", "abcccc"]

~~~

> a(bc)* ---> matches a string that has a followed by zero or more copies of the sequence bc

~~~js
var str = 'ab abc abcc abccc';
  
var rgx = /a(bc)*/g;

str.match(rgx)  ==> ["a", "abc", "abc", "abc"]

~~~

> a(bc){2,5} ---> matches a string that has a followed by 2 up to 5 copies of the sequence bc 


~~~js
var str = 'ab abc abcbc abcbcbc, abcbcbcbcbcbcbc';
  
var rgx = /a(bc){2,5}/g;

str.match(rgx)  ==>  ["abcbc", "abcbcbc", "abcbcbcbcbc"]

~~~

### OR operator — `| or []` ###

> a(b|c) --->  matches a string that has a followed by b or c


~~~js
var str = 'ab abc abcc abccc';
  
var rgx = /a(b|c)/g;

str.match(rgx)  ==> ["ab", "ab", "ab", "ab"]

~~~

> a[bc] --->   same as previous

~~~js
var str = 'ab abc abcc abccc';
  
var rgx = /a[bc]/g;

str.match(rgx)  ==> ["ab", "ab", "ab", "ab"]

~~~













