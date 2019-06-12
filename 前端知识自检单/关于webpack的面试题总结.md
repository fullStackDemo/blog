# 关于webpack的面试题总结

[TOC]

## 为什么要总结webpack相关的面试题

随着现代前端开发的复杂度和规模越来越庞大，已经不能抛开工程化来独立开发了，如react的jsx代码必须编译后才能在浏览器中使用；又如sass和less的代码浏览器也是不支持的。 而如果摒弃了这些开发框架，那么开发的效率将大幅下降。在众多前端工程化工具中，`webpack`脱颖而出成为了当今最流行的前端构建工具。 然而大多数的使用者都只是单纯的会`使用`，而并不知道其深层的原理。希望通过以下的面试题总结可以帮助大家温故知新、查缺补漏，知其然而又知其所以然。



## FAQ 问题列表

1. webpack与grunt、gulp的不同？
2. 与webpack类似的工具还有哪些？谈谈你为什么最终选择（或放弃）使用webpack？
3. 有哪些常见的Loader？他们是解决什么问题的？
4. 有哪些常见的Plugin？他们是解决什么问题的？
5. Loader和Plugin的不同？
6. webpack的构建流程是什么?从读取配置到输出文件这个过程尽量说全
7. 是否写过Loader和Plugin？描述一下编写loader或plugin的思路？
8. webpack的热更新是如何做到的？说明其原理？
9. 如何利用webpack来优化前端性能？（提高性能和体验）
10. 如何提高webpack的构建速度？
11. 怎么配置单页应用？怎么配置多页应用？
12. npm打包时需要注意哪些？如何利用webpack来更好的构建？
13. 如何在vue项目中实现按需加载？

## 解答：

### 1、webpack与grunt、gulp的不同？

三者都是前端构建工具，grunt和gulp在早期比较流行，现在webpack相对来说比较主流

不过一些轻量化的任务还是会用gulp来处理，比如单独打包CSS文件。



[grunt](https://link.zhihu.com/?target=https%3A//www.gruntjs.net/)和[gulp](https://link.zhihu.com/?target=https%3A//www.gulpjs.com.cn/)是基于任务和流（Task、Stream）的。类似jQuery，找到一个（或一类）文件，对其做一系列链式操作，更新流上的数据， 整条链式操作构成了一个任务，多个任务就构成了整个web的构建流程。



webpack是基于入口的。webpack会自动地递归解析入口所需要加载的所有资源文件，然后用不同的Loader来处理不同的文件，用Plugin来扩展webpack功能。



gulp和grunt需要开发者将整个前端构建过程拆分成多个`Task`，并合理控制所有`Task`的调用关系
webpack需要开发者找到入口，并需要清楚对于不同的资源应该使用什么Loader做何种解析和加工。

#### 2、与webpack类似的工具还有哪些？谈谈你为什么最终选择（或放弃）使用webpack？

同样是基于入口的打包工具还有以下几个主流的：

- webpack
- [rollup](https://link.zhihu.com/?target=https%3A//rollupjs.org/)

- [parcel](https://link.zhihu.com/?target=https%3A//parceljs.org/)

**从应用场景上来看：**

- webpack适用于大型复杂的前端站点构建
- rollup适用于基础库的打包，如vue、react
- parcel适用于简单的实验性项目，他可以满足低门槛的快速看到效果

由于parcel在打包过程中给出的调试信息十分有限，所以一旦打包出错难以调试，所以不建议复杂的项目使用parcel。

### 3.有哪些常见的Loader？他们是解决什么问题的？

- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
- source-map-loader：加载额外的 Source Map 文件，以方便断点调试
- image-loader：加载并且压缩图片文件
- babel-loader：把 ES6 转换成 ES5
- css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
- style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
- eslint-loader：通过 ESLint 检查 JavaScript 代码



### 4.有哪些常见的Plugin？他们是解决什么问题的？

* define-plugin：定义环境变量

* commons-chunk-plugin：提取公共代码

* uglifyjs-webpack-plugin：通过`UglifyES`压缩`ES6`代码

