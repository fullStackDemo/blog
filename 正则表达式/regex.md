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

