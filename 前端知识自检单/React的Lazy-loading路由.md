### 使用React的Lazy-loading懒加载组件，进行路由封装

[TOC]

![1568696159178](assets/1568696159178.png)

使用`Suspense`和 `React.lazy()`，进行代码分割和懒加载组件:

#### code-splitting 

`React`官网有相关代码分离的说明，这里不再赘述，使用 `import()` 动态导入会更加有利于代码的分离。

关于`import()`语法，如果你使用CRA（create-react-app）搭建的项目，可以直接使用这个语法。如果是自己从零开始搭建的项目，需要`babel`的插件 `babel-plugin-syntax-dynamic-import`;

~~~shell
yarn add babel-plugin-syntax-dynamic-import
or
npm install babel-plugin-syntax-dynamic-import
~~~

.babelrc 或者 babel.config.js 中增加：

~~~~json
{
  "plugins": ["syntax-dynamic-import"]
}
~~~

#### React.lazy() 

`React.lazy()`允许你渲染一个动态引入的组件像普通组件一样执行;

`React.lazy` 可接受一个返回`Promise`的调用`import()`的`function`，这个`promise`最后`resolve`一个默认导出当前组件。

一般写法：
~~~react
import React, {lazy} from "react";

// 默认后缀 .jsx
const App = lazy(()=> import("../pages/App"));
const About = lazy(()=> import("../pages/About"));

// 路由配置
const routerConfig = [
    {
        path: '/',
        component: App
    },
    {
        path: '/about',
        component: About
    },
];

function AppRouter() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <Router basename="/">
			<Switch>
				{routerConfig.map((n, index) => {
					return <Route path={n.path} exact component={n.component} key={index}></Route>;
				})}
			</Switch>
        </Router>
      </Suspense>
  );
}

export default AppRouter;
~~~

`Lazy`组件需要反之在 `Suspense` 组件内部, `Suspense` 提供一个 `fallback` 内容填充，当正在懒加载组件的时候，比如加个loading;

我们下面对lazy进行二次封装：

~~~react
// lazy load
const lazyLoad = path =>
    lazy(() => {
        return new Promise(resolve => setTimeout(resolve, 1 * 1000)).then(() => import(`../pages/${path}`)).catch(() => import('../components/Error'));
	});
//这个方法需要注意的一点，这个 path 不能直接传`相对路径`类似 `../pages/App`, 
//会找不到组件，所以最好只传过来一个组件名字，然后内部拼接相对路径
//另外在后面加了一个Promise的reject状态处理，如果组件加载错误，将会默认加载Error组件；
import Loading from '@c/Loading';
const App = lazyLoad('App');
const About = lazyLoad('About');

function AppRouter() {
    return (
		<Suspense fallback={<Loading />}>
			{/* 只有当你的应用部署到服务器的二级目录的时候，才需要设置basename */}
			{/* <Router basename="/"> */}
			<Router basename="/">
				<Switch>
					{routerConfig.map((n, index) => {
						return <Route path={n.path} exact component={n.component} key={index}></Route>;
					})}
				</Switch>
			</Router>
		</Suspense>
    );
}

export default AppRouter;
~~~

这样就完成了懒加载路由的简单封装。

![](assets/lazy.gif)

