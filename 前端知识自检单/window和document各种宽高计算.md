### window和document各种宽高计算

#### 1、盒子模型

![img](./assets/box-model-standard-small.png)

所谓盒子模型是：

>  Margin + border + padding + content

举例说明：

```html
<style>
  *{
    margin: 0;
    padding: 0;
  }
  .box{
    width: 200px;
    height: 200px;
    padding: 20px;
    margin: 20px;
    border: 2px solid red;
  }
  .boxItem{
    width: 100%;
    height: 100%;
    background: green;
  }
</style>
<div class="box">
   <div class="boxItem"></div>
</div>
```

![](./assets/box.jpg)

如图所示：

> 可视区域高度： clientWidth = height + padding = 240;
>
> 正文全文高度：scrollHeight = height + padding = 240;
>
> 偏移高度：offsetHeight = height + padding + border = 244;

