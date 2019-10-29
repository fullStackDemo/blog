### centos 7 使用pm2从零部署easy-mock模拟数据服务

[TOC]

最近，要急需做一个APP项目的DEMO, 作项目报告使用，从零开始写接口也来不及了，打算自己模拟一些假数据提供给前端使用，所以把目光转向了 `easy-mock` 。

可惜 `easy-mock `官网，近几天不能访问，无奈只能自己搭建一个 `online` 服务。

> github下载地址：

[https://github.com/easy-mock/easy-mock](https://github.com/easy-mock/easy-mock)

Easy Mock 是一个可视化，并且能快速生成**模拟数据**的持久化服务。

#### 特性

- 支持接口代理
- 支持快捷键操作
- 支持协同编辑
- 支持团队项目
- 支持 RESTful
- 支持 Swagger | OpenAPI Specification (
  - 基于 Swagger 快速创建项目
  - 支持显示接口入参与返回值
  - 支持显示实体类
- 支持灵活性与扩展性更高的响应式数据开发
- 支持自定义响应配置（例：status/headers/cookies）
- 支持 [Mock.js](http://mockjs.com/) 语法
- 支持 [restc](https://github.com/ElemeFE/restc) 方式的接口预览

#### 准备工作

在开始之前，假设你的服务器已经成功安装了 [Node.js](https://nodejs.org/)（**v8.x, 不支持 v10.x**）& [MongoDB](https://www.mongodb.com/)（**>= v3.4**）& [Redis](https://redis.io/)（**>= v4.0**）

[MongoDB安装教程参考网址](https://juejin.im/post/5db295d7518825647313ae01)

[NodeJs安装教程参考网址](https://juejin.im/post/5d7b763d6fb9a06b0202f042)

下载源码

```shell
[root@VM_16_24_centos project]# weget https://github.com/easy-mock/easy-mock/archive/v1.6.0.tar.gz
或者自己下载tar.gz包通过 ftp 上传到服务器
然后解压
[root@VM_16_24_centos project]# tar -xzvf v1.6.0.tar.gz
```

修改配置

> **config/default.json**

```json
{
    "port": 6006,
    "host": "0.0.0.0",
    "pageSize": 30,
    "proxy": false,
    "db": "mongodb://localhost/easy-mock",
    "unsplashClientId": "",
    "redis": {
        "keyPrefix": "[Easy Mock]",
        "port": 6379,
        "host": "localhost",
        "password": "",
        "db": 0
    },
    "blackList": {
        "projects": [],
        "ips": []
    },
    "rateLimit": {
        "max": 1000,
        "duration": 1000
    },
    "jwt": {
        "expire": "14 days",
        "secret": "shared-secret"
    },
    "upload": {
        "types": [
            ".jpg",
            ".jpeg",
            ".png",
            ".gif",
            ".json",
            ".yml",
            ".yaml"
        ],
        "size": 5242880,
        "dir": "../public/upload",
        "expire": {
            "types": [
                ".json",
                ".yml",
                ".yaml"
            ],
            "day": -1
        }
    },
    "ldap": {
        "server": "",
        "bindDN": "",
        "password": "",
        "filter": {
            "base": "",
            "attributeName": ""
        }
    },
    "fe": {
        "copyright": "",
        "storageNamespace": "easy-mock_",
        "timeout": 25000,
        "publicPath": "/dist/"
    }
}

```

本地运行

```shell
$ npm run dev
# 访问 http://127.0.0.1:6006
```



```shell
# 前端静态资源构建打包
$ npm run build

# 以生产环境方式启动，需要提前执行 build
$ npm run start

# 单元测试
$ npm run test

# 语法检测
$ npm run lint
```

#### 启动

> PM2

当在内网服务器部署时，推荐使用 [PM2](https://github.com/Unitech/pm2) 来守护你的应用进程。

> 全局安装 PM2

```shell
$ [sudo] npm install pm2 -g
```

**用 PM2 启动**

> 在此之前，你应该已经完成了 build。

```shell
$ NODE_ENV=production pm2 start app.js
```

如图：

![1571986324954](../%E5%89%8D%E7%AB%AF%E7%9F%A5%E8%AF%86%E8%87%AA%E6%A3%80%E5%8D%95/assets/1571986324954.png)

![1571986442390](../%E5%89%8D%E7%AB%AF%E7%9F%A5%E8%AF%86%E8%87%AA%E6%A3%80%E5%8D%95/assets/1571986442390.png)

![1571986354997](../%E5%89%8D%E7%AB%AF%E7%9F%A5%E8%AF%86%E8%87%AA%E6%A3%80%E5%8D%95/assets/1571986354997.png)

![1571986377356](../%E5%89%8D%E7%AB%AF%E7%9F%A5%E8%AF%86%E8%87%AA%E6%A3%80%E5%8D%95/assets/1571986377356.png)

postman测试：

![1571986402227](../%E5%89%8D%E7%AB%AF%E7%9F%A5%E8%AF%86%E8%87%AA%E6%A3%80%E5%8D%95/assets/1571986402227.png)

接下来就可以在线快乐的玩耍了哈哈