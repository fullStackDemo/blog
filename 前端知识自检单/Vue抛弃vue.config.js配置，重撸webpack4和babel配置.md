### Vue项目改造抛弃vue-cli配置，重撸webpack4和babel配置

抛弃自带的vue.config.js的配置模式，手动使用webpack进行构建：

> webpack4 相关 loaders 和 plugins

~~~
>>>>>>>>>>>>>>>>>>>>>>>相关loader<<<<<<<<<<<<<<<<<<<<<<
file-loader
解决文件中 import/require() 的资源，转化为URL，再输出到指定文件夹内

url-loader
把图片转化成 base64 URLs, 可以根据limit大小自由控制

css-loader
css-loader 解释 @import and url() 比如 import/require() 然后解析他们

file-loader
file-loader 解析文件中的 import/require() 成一个URL 然后输出到输出文件中

>>>>>>>>>>>>>>>>>>>>>>>相关plugin<<<<<<<<<<<<<<<<<<<<<<
MiniCssExtractPlugin
提取css到单独的文件

clean-webpack-plugin
清理构建的资源

webpack-build-notifier
构建完成桌面提醒

html-webpack-plugin
生成html入口模板


~~~

