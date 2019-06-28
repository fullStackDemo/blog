# TCP三次握手和四次挥手过程

[TOC]

#### 1、三次握手

（1）三次握手的详述

首先Client端发送连接请求报文，Server段接受连接后回复ACK报文，并为这次连接分配资源。Client端接收到ACK报文后也向Server段发生ACK报文，并分配资源，这样TCP连接就建立了

![img](https://images2017.cnblogs.com/blog/985821/201708/985821-20170802101806802-1497343688.png)

最初两端的TCP进程都处于CLOSED关闭状态，A主动打开连接，而B被动打开连接;

（**A、B关闭状态CLOSED**——**B收听状态LISTEN——A同步已发送状态SYN-SENT——B同步收到状态SYN-RCVD——A、B连接已建立状态ESTABLISHED**）

- B的TCP服务器进程先创建传输控制块TCB，准备接受客户进程的连接请求。然后服务器进程就处于LISTEN（收听）状态，等待客户的连接请求。若有，则作出响应。
- **1****）第一次握手：**A的TCP客户进程也是首先创建传输控制块TCB，然后向B发出连接请求报文段，（首部的**同步位SYN=1**，**初始序号seq=x）**，（SYN=1的报文段不能携带数据）但要消耗掉一个序号，此时TCP客户进程进入SYN-SENT（同步已发送）状态。
- **2****）第二次握手：**B收到连接请求报文段后，如同意建立连接，则向A发送确认，在确认报文段中（**SYN=1，ACK=1，确认号ack=x+1，初始序号seq=y**），测试TCP服务器进程进入SYN-RCVD（同步收到）状态；
- **3****）第三次握手：**TCP客户进程收到B的确认后，要向B给出确认报文段（**ACK=1，确认号ack=y+1，序号seq=x+1**）（初始为seq=x，第二个报文段所以要+1），ACK报文段可以携带数据，不携带数据则不消耗序号。TCP连接已经建立，A进入ESTABLISHED（已建立连接）。
- 当B收到A的确认后，也进入ESTABLISHED状态。

（2）总结三次握手过程：

- **第一次握手**：起初两端都处于CLOSED关闭状态，Client将标志位SYN置为1，随机产生一个值seq=x，并将该数据包发送给Server，Client进入SYN-SENT状态，等待Server确认；
- **第二次握手**：Server收到数据包后由标志位SYN=1得知Client请求建立连接，Server将标志位SYN和ACK都置为1，ack=x+1，随机产生一个值seq=y，并将该数据包发送给Client以确认连接请求，Server进入SYN-RCVD状态，此时操作系统为该TCP连接分配TCP缓存和变量；
- **第三次握手**：Client收到确认后，检查ack是否为x+1，ACK是否为1，如果正确则将标志位ACK置为1，ack=y+1，并且此时操作系统为该TCP连接分配TCP缓存和变量，并将该数据包发送给Server，Server检查ack是否为y+1，ACK是否为1，如果正确则连接建立成功，Client和Server进入ESTABLISHED状态，完成三次握手，随后Client和Server就可以开始传输数据。

