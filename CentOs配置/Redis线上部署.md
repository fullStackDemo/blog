### Redis的概述、搭建及简单使用（基于CentOS 6.5 Linux）

[TOC]



####  1、Redis 简介

[Redis](https://redis.io/) 是完全开源免费的，遵守BSD协议，是一个高性能的key-value数据库。

Redis 与其他 key – value 缓存产品有以下三个特点：

- Redis支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。
- Redis不仅仅支持简单的key-value类型的数据，同时还提供list，set，zset，hash等数据结构的存储。
- Redis支持数据的备份，即master-slave模式的数据备份。

#### 2、Redis 优势

- 性能极高 – Redis能读的速度是110000次/s,写的速度是81000次/s 。
  丰富的数据类型 – Redis支持二进制案例的 Strings, Lists, Hashes, Sets 及 Ordered Sets 数据类型操作。
- 原子 – Redis的所有操作都是原子性的，意思就是要么成功执行要么失败完全不执行。单个操作是原子性的。多个操作也支持事务，即原子性，通过MULTI和EXEC指令包起来。
- 丰富的特性 – Redis还支持 publish/subscribe, 通知, key 过期等等特性。

#### 3、Redis与其他key-value存储有什么不同？

- Redis有着更为复杂的数据结构并且提供对他们的原子性操作，这是一个不同于其他数据库的进化路径。Redis的数据类型都是基于基本数据结构的同时对程序员透明，无需进行额外的抽象。

  

- Redis运行在内存中但是可以持久化到磁盘，所以在对不同数据集进行高速读写时需要权衡内存，因为数据量不能大于硬件内存。在内存数据库方面的另一个优点是，相比在磁盘上相同的复杂的数据结构，在内存中操作起来非常简单，这样Redis可以做很多内部复杂性很强的事情。同时，在磁盘格式方面他们是紧凑的以追加的方式产生的，因为他们并不需要进行随机访问。

#### 4、Redis 安装

wget下载：

```bash
[root@10 opt]# wget http://download.redis.io/releases/redis-4.0.12.tar.gz
```

tar解压：

```bash
[root@10 opt]# tar -zxvf redis-4.0.12.tar.gz
```

重命名：

```bash
[root@10 opt]# mv redis-4.0.12 redis
```

进入目录 redis 并 make :

```bash
[root@10 opt]# cd redis
[root@10 redis]# make
```

进入src 启动：

```bash
[root@10 redis]# cd src
[root@10 src]# ./redis-server
```

提示：

```bash
[root@10 src]# ./redis-server 
30902:C 26 May 05:40:00.253 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
30902:C 26 May 05:40:00.254 # Redis version=4.0.12, bits=64, commit=00000000, modified=0, pid=30902, just started
30902:C 26 May 05:40:00.254 # Warning: no config file specified, using the default config. In order to specify a config file use ./redis-server /path/to/redis.conf
30902:M 26 May 05:40:00.255 * Increased maximum number of open files to 10032 (it was originally set to 1024).
                _._                                                  
           _.-``__ ''-._                                             
      _.-``    `.  `_.  ''-._           Redis 4.0.12 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._                                   
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 30902
  `-._    `-._  `-./  _.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |           http://redis.io        
  `-._    `-._`-.__.-'_.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |                                  
  `-._    `-._`-.__.-'_.-'    _.-'                                   
      `-._    `-.__.-'    _.-'                                       
          `-._        _.-'                                           
              `-.__.-'                                               

30902:M 26 May 05:40:00.257 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
30902:M 26 May 05:40:00.257 # Server initialized
30902:M 26 May 05:40:00.257 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
30902:M 26 May 05:40:00.259 # WARNING you have Transparent Huge Pages (THP) support enabled in your kernel. This will create latency and memory usage issues with Redis. To fix this issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' as root, and add it to your /etc/rc.local in order to retain the setting after a reboot. Redis # Redis configuration file example.
must be restarted after THP is disabled.
30902:M 26 May 05:40:00.259 * Ready to accept connections
```

需要配置 redis.conf:

```bash
[root@10 src]# vi ../redis.conf
```

找到更改以下内容,打开守护进程

```bash
# no 改为 yes
daemonize yes

# 日志可以自行添加，不做要求
logfile ./logs/redis.log 
```

启动redis并应用redis.conf配置文件:

```bash
[root@10 src]# ./redis-server ../redis.conf
```

打开客户端并进行简单测试:

```bash
[root@10 src]# ./redis-cli
127.0.0.1:6379> EXISTS mykey
(integer) 0 
127.0.0.1:6379> append mykey hello
(integer) 5
127.0.0.1:6379> append mykey world
(integer) 10
127.0.0.1:6379> get mykey
"helloworld"
127.0.0.1:6379> 
```

基本配置到此结束。

#### 5、定义全局命令

```bash
[root@10 src]# vi /etc/profile
# 增加
export REDIS_HOME=/opt/mongodb
export PATH=$REDIS_HOME/src:$PATH

# 生效
[root@10 src]# source /etc/profile
```

设置完，就可以在任何目录下，执行：

```bash
redis-cli
```

查看和操作数据库啦。

