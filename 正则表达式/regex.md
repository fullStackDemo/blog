## 正则表达式 ##

### `Basic topics`  ###   

* ^ and $

~~~js
  ^The  ----->   matches any string that starts with The
  
  var str = 'The end';
  
  var rgx = /^The/;
  
  str.match(rgx)  
  ||
  ||
  ["The", index: 0, input: "The code The", groups: undefined]
    0: "The"
    groups: undefined
    index: 0
    input: "The code The"
    length: 1
    __proto__: Array(0)
  
~~~