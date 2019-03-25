Redux
-----

虽然是react的一个状态管理库，可以单独使用，接下来我们详细讲解下底层代码。

废话不多讲，先说下基本的知识点。

### Actions ###

`actions` 是通过 `store.dispatch(action)`改变 `state`的唯一方法，不能直接通过 `this.state = {}` 来直接改变 `state`。

生成 `actions` 有两种方式：

> 1、单纯的 `object`

~~~js
const action = {
  type: 'ADD_TODO',
  text: 'Build my first Redux app'
}
dispatch(action)
~~~

> 2、action creator function

~~~js
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
dispatch(addTodo())
~~~
