### CentOs 7 从零配置Jenkins自动化部署

[TOC]

工欲善其事必先利其器，一个好的流程化工具，可以减轻很多工作负担。
废话不多说，我们从来搭建一个自动化部署服务。

Jenkins是一个开源软件项目，是基于Java开发的广泛用于持续构建的可视化web工具，就是各种项目的的“自动化”编译、打包、分发部署，将传统编译、打包、上传、部署到Tomcat中的过程交由Jenkins，Jenkins通过给定的代码地址，将代码拉取到jenkins宿主机上，进行编译、打包和发布到web容器中。Jenkins可以支持多种语言（比如：java、c#、php等等），也兼容ant、maven、gradle等多种第三方构建工具，同时跟git、svn无缝集成，也支持直接与github直接集成

#### 1、安装 Jenkins

[官网](https://jenkins.io/zh/download/)下载war安装包

![1577359466527](%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E9%85%8D%E7%BD%AEjenkins%E8%87%AA%E5%8A%A8%E5%8C%96%E9%83%A8%E7%BD%B2.assets/1577359466527.png)

然后拷贝到tomcat的webapps目录下

启动tomcat

访问http://xx.xx.xx.xx/jenkins

看到如图的页面，进入指定的文件中获取到密码进行登录

![1577360252005](%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E9%85%8D%E7%BD%AEjenkins%E8%87%AA%E5%8A%A8%E5%8C%96%E9%83%A8%E7%BD%B2.assets/1577360252005.png)

![1577360695387](%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E9%85%8D%E7%BD%AEjenkins%E8%87%AA%E5%8A%A8%E5%8C%96%E9%83%A8%E7%BD%B2.assets/1577360695387.png)

最好选择建议安装的插件

![1577360744865](%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E9%85%8D%E7%BD%AEjenkins%E8%87%AA%E5%8A%A8%E5%8C%96%E9%83%A8%E7%BD%B2.assets/1577360744865.png)

等待安装后，建立第一个用户admin账号…

![1577360822399](%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E9%85%8D%E7%BD%AEjenkins%E8%87%AA%E5%8A%A8%E5%8C%96%E9%83%A8%E7%BD%B2.assets/1577360822399.png)

安装插件

![1577361343355](%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E9%85%8D%E7%BD%AEjenkins%E8%87%AA%E5%8A%A8%E5%8C%96%E9%83%A8%E7%BD%B2.assets/1577361343355.png)

