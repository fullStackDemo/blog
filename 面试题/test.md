[TOC]
## JavaScript

###  1 基本类型

介绍一下基本类型有几种？

怎么判断数据类型？

Object 和 Array，怎么区分？

null == undefined ?

### 2 变量作用域

```javascript
var name = "Hello body";
var a = {
	name: "A",
	sayHi: function(){
		console.log(this.name)
	}
};
var b = {
	name: 'B'
};
var sayHi = a.sayHi;
name = "Hello C";

console.log(name)

a.sayHi()
sayHi()
a.sayHi.call(b)

```



### 3 闭包



### 4 call 和 apply的区别



### 5 浅拷贝 和 深拷贝



### 6 const  和 let 的区别



### 7 写出Es6的几种用法



### 8 Vue 生命周期实现过程？



### 9 vuex中 mumation 和 action 有什么不同？ 实现原理是什么？



### 10 vue v-if 和 v-show 的区别？ Key的作用？



### 11 vue keep-alive 用法？



### 12 bind 和 call apply 区别



### 13 Promise 和 async await 区别？



### 14 本地存储



### 15 跨域



### 16 Event Loop



### 17 事件委托机制



### 18 异步请求



### 19 Vue 双向数据绑定的原理



## CSS

### 1 盒子模型

### 2、垂直居中问题



