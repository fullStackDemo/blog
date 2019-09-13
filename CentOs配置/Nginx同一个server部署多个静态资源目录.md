### Nginx同一个server部署多个静态资源目录



> 一般情况，有时候业务需求，需要在一个`server`下面不同目录部署两个不同的项目。
>
> 比如 http://domain:port/admin 匹配的是 `admin` 项目
>
> 比如 http://domain:port/react    匹配的是 `react` 项目

我们在`nginx.conf `里面写一个新的`server`；

```nginx
server {
  listen 6002;
  server_name **.**.**.**;
  gzip on;
  
  location /admin {
    alias /projects/admin/;
    #指定主页
    index index.html;
    #自动跳转
    autoindex on;   
  }
  
  location /react {
    alias /projects/react/;
    #指定主页
    index index.html;
    #自动跳转
    autoindex on;   
  }
  
}
```

然后关闭 `nginx`

```shell
[root]# nginx -s stop
```

重启 `nginx`

```bash
[root]# nginx -c /etc/nginx/nginx.conf
```

#### 总结：

这里需要注意的就是`location`中的路径匹配问题，`root` 和 `alias` 的区别；

```nginx
# 错误写法，会报404
location /admin {
    root /projects/admin/;
    #指定主页
    index index.html;
    #自动跳转
    autoindex on;   
}

location /react {
    root /projects/react/;
    #指定主页
    index index.html;
    #自动跳转
    autoindex on;   
}

# 当你访问 http://***/admin
# root ==> 实际指向的是 http://***/admin/projects/admin/, 这个时候肯定找不到index.html
# alias ==> 实际指向的是 http://***/admin, 可以在/projects/admin/找到index.html
```

> document:
>
> In case of the `root` directive, **full path is appended to the root including the location part**, where as in case of the `alias` directive, **only the portion of the path NOT including the location part is appended to the alias**.

Let's say we have the config

```
location /static/ {
    root /var/www/app/static/;
    autoindex off;
}
```

In this case the final path that Nginx will derive will be

```
/var/www/app/static/static
```

This is going to return `404` since there is no `static/` within `static/`

This is because the location part is appended to the path specified in the `root`. Hence, with `root`, the correct way is

```
location /static/ {
    root /var/www/app/;
    autoindex off;
}
```

On the other hand, with `alias`, the location part gets **dropped**. So for the config

```
location /static/ {
    alias /var/www/app/static/;
    autoindex off;
}
```

the final path will correctly be formed as

```
/var/www/app/static
```

