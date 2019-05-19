### NodeJs项目服务器线上部署

[TOC]

#### 1、安装NodeJs

[官网仓库](https://nodejs.org/dist/v9.9.0/)下载好NodeJs的Linux包(我用的 node-v9.9.0-linux-x64.tar.gz)到本地然后通过FTP（[filezilla](https://filezilla-project.org/)）上传到服务器;

##### 1、==解压 node-v9.9.0-linux-x64.tar.gz==

* 找到你上传的位置目录

  ```bash
  [root@10 /]# ls
    bin   dev  home  lib64  media  node-v9.9.0-linux-x64.tar.gz  opt  ...
  ```
  
* 解压到当前目录

  ```bash
  [root@10 /]# tar -zvxf node-v9.9.0-linux-x64.tar.gz
  ```

* 移动到安装目录并重命名 node

  ```bash
  [root@10 /]# mv node-v9.9.0-linux-x64 /opt/node
  ```

  

##### 2、==配置环境变量==

* 打开etc目录下的 profile 文件

  ```bash
  [root@10 /]# vi /etc/profile
  ```

* 在文件的最后添加如下内容

  ```bash
  export NODE_HOME=/opt/node
  export PATH=$NODE_HOME/bin:$PATH
  ```

* 使刚配置好的环境变量生效

  ```bash
  [root@10 /]# source /etc/profile
  ```

##### 3、==检查环境==

```

```








