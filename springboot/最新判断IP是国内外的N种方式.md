##最新判断IP是国内外的多种方式

[TOC]

### 1 、前言

如何根据IP判断是国内的IP还是国外的IP呢？

应用场景大多是网站开发时中英文版本的自动判断。

相信大多数人肯定会推荐淘宝的免费API，但是目前已经无法访问，并且也很不稳定。

![image-20200920151244103](assets/image-20200920151244103.png)

也会有人推荐跳过IP判断，根据当前系统语言判断，虽然速度快，但不准确：

~~~javascript
var Browser_Agent = navigator.userAgent;
    // 浏览器为IE的情况 
    if (Browser_Agent.indexOf(" MSIE ") !=- 1 ){
        var a = navigator.browserLanguage;
        if (a != " zh-cn " ){
            // 英文网站
            console.log("英文网站");
        }
    }
    // 浏览器非IE的情况 
    else {
        var b = navigator.language;
        if (b != " zh-CN " ){
            // 英文网站
            console.log("英文网站");
        }
    }
}
~~~

那么，问题来了，除了这些看起来不太靠谱的方法，还有其他实现方法或者第三方方法吗？

答案是当然有，付费的有，我们这里只讲一些免费第三方的方法和可以自己实现的方法。

我们的需求是只需要判断IP是国内外，而不需要判断IP的具体城市，所以问题变得简单了许多。

### 2、实现方法

#### 2.1、第三方库

比较强大的第三库，不得不推荐MaxMind的GeoIP®Databases and Services，他们有自己的IP库，提供各种准确的接口，付费的可以根据定位很准确，不付费的只可以模糊定位到国家，不过已经符合我们的需求。

![image-20200920150952903](assets/image-20200920150952903.png)

![image-20200920151317196](assets/image-20200920151317196.png)

![image-20200920152120192](assets/image-20200920152120192.png)

> 基于javaScript实现
>
> https://dev.maxmind.com/geoip/geoip2/javascript/tutorial/

~~~html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div>
    目前所在：<span id="result"></span>
  </div>
  <script src="//geoip-js.com/js/apis/geoip2/v2.1/geoip2.js" type="text/javascript"></script>
  <script>
    var test = (function () {
      var onSuccess = function (geoipResponse) {
        /* There's no guarantee that a successful response object
         * has any particular property, so we need to code defensively. */
        if (!geoipResponse.country.iso_code) {
          return;
        }
        /* ISO country codes are in upper case. */
        var code = geoipResponse.country.iso_code.toLowerCase();
        document.getElementById('result').innerHTML = code;
      };
      var onError = function (error) {
      };
      return function () {
        geoip2.country(onSuccess, onError);
      };
    }());
    test();
  </script>
</body>

</html>
~~~



![image-20200920153332914](assets/image-20200920153332914.png)

通过这个免费的`javascript API`，就可以判断当前IP是否是国内外，因为我开代理测试的，所以显示当前IP是新加坡。

`MaxMind`的其他实现方式，有的是需要付费，按次收费，获取到的数据也会更加详细更加准确。

#### 2.2、自己实现

上一个方式是借助第三方免费API判断IP所在国家，那么如果是我们做，该怎么做呢？

我们只需要判断IP所在国家是国内外即可。

首先我们需要获取IP库，通过IP库判断；

> IP库
>
> ip库在apnic的官方网站上可以下载
>
> http://ftp.apnic.net/apnic/stats/apnic/delegated-apnic-latest

![image-20200920154848639](assets/image-20200920154848639.png)

> 那么我们该如何处理呢？总体上分为以下几个部分：

1、使用脚本定期从`apnic``下载IP库`，筛选出所有`apnic|CN|ipv4`, 生成`china_ip.txt`（`其实这里如果只判断CN不太准确，HK、MO和TW被apnic分成单独的，他们都是中国的领土不可被分割，不过我们这里不增加这个逻辑了，所以确切这个文本内的IP是中国大陆的IP`）;

2、基于`java`解析生成的`china_ip.txt`，这样的话相比解析全部IP，解析的成本就低了不少；

3、解析IP列表，存储到`Redis`, 定时N小时过期，保证实时IP库的更新；

4、根据IP到`Redis`中存储的数据做判断，如果在各个地址段范围内，表示是国内ip, 否则是国外ip；

5、判断过的IP也会保存在`Redis`，避免重复的判断。

##### 2.2.1 定时更新下载IP库

> download.sh
>
> 每次下载耗时10mins
>
> 每次生成时，会先生成一个china_ip_new文件，成功之后才会替换原来文件china_ip

~~~shell
ip_url=http://ftp.apnic.net/apnic/stats/apnic/delegated-apnic-latest
ip_txt=china_ip.txt
ip_txt_new=china_ip_new.txt
ip_backup_folder=backup
cur_date=$(date +'%Y%m%d%H%M%S')
cur_path=/home/project/ip

# 删除上一个ip_txt_new文本
if [ -f ${ip_txt_new} ]; then
	rm -rf ${ip_txt_new}
fi

# 除第一个生成ip.txt 文本外，第二次更新，要先生成新的ip_new.txt，不能直接删除ip.text, 文本下载需要12min，以免此期间影响业务代码访问该文本
curl ${ip_url} | grep ipv4 | grep CN | awk -F\| '{ printf("%s/%d\n", $4, log($5)/log(2)) }' > ${ip_txt_new}

echo 'download ip text complete'

echo 'start backup and replace'

# 生成ip_new.txt后, 加上日期后缀备份上一份ip.txt, 然后替换当前ip.txt为最新的 ip_new.txt
if [ ! -d ${ip_backup_folder} ]; then
	mkdir ${ip_backup_folder}
fi

if [ -f ${ip_txt} ]; then
	mv ${ip_txt} ${cur_path}/${ip_backup_folder}/${ip_txt}_${cur_date}
fi

if [ -f ${ip_txt_new} ]; then
	mv ${ip_txt_new} ${ip_txt}
fi

echo 'generate new ip text complete'

~~~

> 加上定时任务

~~~shell
[root@10 ip]# crontab -e
~~~

~~~shell
0 0 * * * sh /home/project/ip/download.sh >> /home/project/ip/download.log 2>&1
~~~

`0 0 * * *`为cron表达式，代表着每天凌晨0:00更新下载

~~~shell
    cron表达式	
	*    *    *    *    *    
	-    -    -    -    -    
	|    |    |    |    |    
	|    |    |    |    +----- 星期几 (0 - 7) (Sunday=0 or 7)
	|    |    |    +---------- 月份 (1 - 12)
	|    |    +--------------- 几号 (1 - 31)
	|    +-------------------- 小时 (0 - 23)
	+------------------------- 分钟 (0 - 59)
~~~

![1600858088732](%E6%9C%80%E6%96%B0%E5%88%A4%E6%96%ADIP%E6%98%AF%E5%9B%BD%E5%86%85%E5%A4%96%E7%9A%84N%E7%A7%8D%E6%96%B9%E5%BC%8F.assets/1600858088732.png)

![1600858343787](%E6%9C%80%E6%96%B0%E5%88%A4%E6%96%ADIP%E6%98%AF%E5%9B%BD%E5%86%85%E5%A4%96%E7%9A%84N%E7%A7%8D%E6%96%B9%E5%BC%8F.assets/1600858343787.png)

> china_ip.txt
>
> 保存文件格式类似为 222.126.128.0/15

![1600858425241](%E6%9C%80%E6%96%B0%E5%88%A4%E6%96%ADIP%E6%98%AF%E5%9B%BD%E5%86%85%E5%A4%96%E7%9A%84N%E7%A7%8D%E6%96%B9%E5%BC%8F.assets/1600858425241.png)

在IP库中：

比如`222.126.128.0/15`对应的文本应该是`apnic|CN|ipv4|222.126.128.0|32768|20060830|allocated`中的`222.126.128.0|32768`;

![1600858795670](%E6%9C%80%E6%96%B0%E5%88%A4%E6%96%ADIP%E6%98%AF%E5%9B%BD%E5%86%85%E5%A4%96%E7%9A%84N%E7%A7%8D%E6%96%B9%E5%BC%8F.assets/1600858795670.png)

在IP库中，所有的IP不分国家，按照IP的顺序从上而下排列着；

~~~shell
   apnic|CN|ipv4|222.126.128.0|32768|20060830|allocated
	-    -    -        -         -    
	|    |    |        |         |    
	|    |    |        |         +----- 代表着该IP段下有32768个地址
	|    |    |        +--------------- IP地址
	|    |    +------------------------ ipv4
	|    +----------------------------- CN代表中国
	+---------------------------------- 代表apnic
	
那么为什么`222.126.128.0`下有`32768`个地址呢，是怎么计算的呢？
那么我们需要根据下一个IP判断，如上图所示下一个IP是    
`apnic|PH|ipv4|222.127.0.0|32768|20060913|allocated`
PH是菲律宾，说明这个IP就是菲律宾了。

`apnic|CN|ipv4|222.126.128.0|32768|20060830|allocated`
`apnic|PH|ipv4|222.127.0.0|32768|20060913|allocated`

IP：
IP是Internet Protocol（网际互连协议）的缩写，是TCP/IP体系中的网络层协议；
`IP地址是一个32位的二进制数，通常被分割为4个“8位二进制数”（也就是4个字节）。IP地址通常用“点分十进制”表示成（a.b.c.d）的形式，其中，a,b,c,d都是0~255之间的十进制整数`；
所有a,b,c,d都有2的32次方随机匹配地址数。
所以：
从`222.126.128.0`到`222.127.0.0`，有多少种可能？
`a相同，b=126到b=127地址数加1,c=128到c=0剩余128个选择,d有256种选择`
`计算公式=1*128*256=32768个地址`

我们还可以这么假设，
由于c*d=256*256=65536，当`apnic|CN|ipv4|222.160.0.0|131072|20031212|allocated`中`131072`大于65536说明，a.b.*.*也就是222.160.*.*无论都两个整数是什么，都属于中国IP; 并且由于131072=65536*2，说明b+1后的a.b+1.*.*也就是222.161.*.*全部是中国IP；
那么这个结果正确吗，让我们从IP库数据看下：
`apnic|CN|ipv4|222.160.0.0|131072|20031212|allocated`
`apnic|CN|ipv4|222.162.0.0|65536|20031212|allocated`
下一条数据222.162.0.0，所以我们的假设是正确的。虽然不知道为什么Apnic没有把222.162.0.0一并合并到222.160.0.0，但是我们的假设是正确的，第五位的数字代表着基于当前IP按正顺序下的地址数。

所以我们可以这么处理数据：
首先判断第五位的数字，如果1
	
~~~



##### 2.2.2、IP