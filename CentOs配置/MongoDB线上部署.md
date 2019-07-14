## Linux CentOS 6.5 安装MongoDB的操作

[TOC]

#### **1、安装mongodb-3.6.4版本**

执行命令

```bash
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel62-3.6.4.tgz
```

下载完成后，进行解压

```bash
tar -zxvf mongodb-linux-x86_64-rhel62-3.6.4.tgz
```

重命名

```bash
mv mongodb-linux-x86_64-rhel62-3.6.4 mongodb
```

进入到mongodb目录下

```bash
cd mongodb
```

创建db和日志目录

```bash
mkdir data
mkdir -p data/db
mkdir -p data/logs
```

在logs目录下创建mongodb.log文件

```bash
touch mongodb.log
```

在data目录下创建mongodb.conf文件

```bash
cd mongodb/data
```

```bash
vi mongodb.conf
```

```bash
port=27017

dbpath=/opt/mongodb/data/db

logpath=/opt/mongodb/data/logs/mongodb.log

fork=true

logappend=true

```

**启动**

在mongodb目录下执行：

```bash
./bin/mongod --config /opt/mongodb/data/mongodb.conf
```

提示：

```bash
[root@10 mongodb]# ./bin/mongod --config /opt/mongodb/data/mongodb.conf
about to fork child process, waiting until server is ready for connections.
forked process: 25096
child process started successfully, parent exiting
```

说明配置成功啦

进入到mongodb进行操作

```bash
./bin/mongo
```

这时候，应该可以看到

```
[root@10 mongodb]# ./bin/mongo
MongoDB shell version v3.6.4
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.6.4
Server has startup warnings: 
2019-05-25T19:39:11.895+0800 I STORAGE  [initandlisten] 
2019-05-25T19:39:11.895+0800 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2019-05-25T19:39:11.895+0800 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
2019-05-25T19:39:12.860+0800 I CONTROL  [initandlisten] 
2019-05-25T19:39:12.860+0800 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2019-05-25T19:39:12.860+0800 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2019-05-25T19:39:12.860+0800 I CONTROL  [initandlisten] ** WARNING: You are running this process as the root user, which is not recommended.
2019-05-25T19:39:12.860+0800 I CONTROL  [initandlisten] 
2019-05-25T19:39:12.861+0800 I CONTROL  [initandlisten] ** WARNING: This server is bound to localhost.
2019-05-25T19:39:12.861+0800 I CONTROL  [initandlisten] **          Remote systems will be unable to connect to this server. 
2019-05-25T19:39:12.861+0800 I CONTROL  [initandlisten] **          Start the server with --bind_ip <address> to specify which IP 
2019-05-25T19:39:12.861+0800 I CONTROL  [initandlisten] **          addresses it should serve responses from, or with --bind_ip_all to
2019-05-25T19:39:12.861+0800 I CONTROL  [initandlisten] **          bind to all interfaces. If this behavior is desired, start the
2019-05-25T19:39:12.861+0800 I CONTROL  [initandlisten] **          server with --bind_ip 127.0.0.1 to disable this warning.
2019-05-25T19:39:12.861+0800 I CONTROL  [initandlisten] 
2019-05-25T19:39:12.861+0800 I CONTROL  [initandlisten] 
2019-05-25T19:39:12.861+0800 I CONTROL  [initandlisten] ** WARNING: /sys/kernel/mm/transparent_hugepage/enabled is 'always'.
2019-05-25T19:39:12.861+0800 I CONTROL  [initandlisten] **        We suggest setting it to 'never'
2019-05-25T19:39:12.861+0800 I CONTROL  [initandlisten] 
> db
test
> 
```

可以看到有很多警告信息，没有关系，因为接下来要创建用户，mongodb默认情况下没有用户，需要创建，授权。

```bash
> use admin
switched to db admin
```

```bash
> db.system.users.find();
```

```bash
db.createUser(
... {
... user:"root",
... pwd:"123456",
... roles:[{role:"root",db:"admin"}]
... }
...)
```

退出mongodb客户端，重新编辑配置文件`vi data/mongodb.conf`

加入一行`auth=true`，保存退出，再次启动mongodb，此时就不会出现警告信息，进入客户端，进行用户验证。

每次需要到安装目录执行，挺麻烦的。

#### **2、可以注册为全局shell命令**

```bash
vi /etc/profile
```

在最后追加：

```bash
export MONGODB_HOME=/opt/mongodb
export PATH=$MONGODB_HOME/bin:$PATH
```

保存使其生效：

```bash
source /etc/profiile
```

这样就不用每次进入到`/opt/mongodb`, 直接输入mongo就可以进入到mongo的shell环境。

#### **3、[Robo 3T](https://robomongo.org/) 远程连接服务器**

之前我们启动`./bin/mongod`的时候，这项服务一直运行在`service`里面：

检查所有service命令:

```
service --status-all
```

输出：

```bash
....
mongod (pid 25096) is running...
....
```

这时候我们需要终止 `mongod` 服务：

```bash
service mongod stop
```

重启服务：

```bash
mongod --bind_ip_all --config /opt/mongodb/data/mongodb.conf
```

这里为什么加上`--bind_ip_all`?

mongoDB 默认绑定到 `127.0.0.1`，为了安全不允许远程了解，我们设置`--bind_ip_all`，允许所有远程机器连接；

如果你的机子再不能连接请查看防火墙是否增加 27017 端口：

查看防火墙：

```bash
vi /etc/sysconfig/iptables
```

在后面追加：

```bash
-A INPUT -p tcp -m state --state NEW -m tcp --dport 27017 -j ACCEPT
-A INPUT -p udp -m state --state NEW -m udp --dport 27017 -j ACCEPT
```

防火墙重启：

```bash
service iptables restart
```

这时候，应该一切OK啦；

#### 4、**开启权限 auth**



