### Vue项目改造抛弃vue-cli配置，重撸webpack4和babel配置

抛弃自带的vue.config.js的配置模式，手动使用webpack进行构建：

> webpack4 相关 loaders 和 plugins

~~~
file-loader
解决文件中 import/require() 的资源，转化为URL，再输出到指定文件夹内。

url-loader
把图片转化成 base64 URLs, 可以更加limit大小自由控制

css-loader




~~~

