### Vue项目改造抛弃vue-cli配置，重撸webpack4和babel配置

抛弃自带的vue.config.js的配置模式，手动使用webpack进行构建：

> webpack4 相关loaders和plugins

~~~
>>>>>>>>>>>>>>>>>>>>>>>相关loader<<<<<<<<<<<<<<<<<<<<<<

vue-loader
编译.vue文件

babel-loader
编译成ES5

file-loader
解决文件中 import/require() 的资源，转化为URL，再输出到指定文件夹内

url-loader
把图片转化成 base64 URLs, 可以根据limit大小自由控制

css-loader
css-loader 解释 @import and url() 比如 import/require() 然后解析他们

file-loader
file-loader 解析文件中的 import/require() 成一个URL 然后输出到输出文件中

style-loader
dev环境，把css注入到DOM

>>>>>>>>>>>>>>>>>>>>>>>相关plugin<<<<<<<<<<<<<<<<<<<<<<

mini-css-extract-plugin
提取css到单独的文件

clean-webpack-plugin
清理构建的资源

webpack-build-notifier
构建完成桌面提醒

html-webpack-plugin
生成html入口模板

optimize-css-assets-webpack-plugin
css去重压缩

purgecss-webpack-plugin
去除css中未使用的代码

webpack-dev-server
本地server

webpack-spritesmith
自动整合成雪碧图

compression-webpack-plugin
@gfx/zopfli
压缩代码,根据算法生成gzip

webpack-bundle-analyzer
生成bundle后分析报告，方便优化

~~~

>安装依赖
~~~bash
yarn add -D webpack webpack-cli webpack-dev-server vue-loader babel-loader file-loader css-loader style-loader url-loader mini-css-extract-plugin  clean-webpack-plugin webpack-build-notifier html-webpack-plugin optimize-css-assets-webpack-plugin purgecss-webpack-plugin webpack-spritesmith compression-webpack-plugin webpack-bundle-analyzer
~~~



