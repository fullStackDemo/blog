## 正则表达式 ##

正则还是很重要的,记录一些基本容易忘记的知识点。

## `Basic topics`  ##

### ^ and $ ###
 
> ^The  ----->   matches any string that starts with The


~~~js  
var str = 'The end';

var rgx = /^The/g;

str.match(rgx)  ==> ['The']  
~~~

> end$ ----->   matches a string that ends with end

~~~js
var str = 'The end';
  
var rgx = /end$/g;

str.match(rgx)  ==> ['end']

~~~

> ^The end$   exact string match (starts and ends with The end)

~~~js
var str = 'The end';
  
var rgx = /^The end$/g;

str.match(rgx)  ==> ['The end']

~~~

### Quantifiers — * + ? and {} ###

