Redux
-----

虽然是react的一个状态管理库，可以单独使用，接下来我们详细讲解下底层代码。

废话不多讲，先说下基本的知识点。

### `Actions` ###

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


### `Reducers` ###

`Actions` 只能描述发生了什么，并不能描述状态发生了什么变化，`Reducers` 指定 `state tree` 将要发生什么。

~~~js
const items = (state = [], action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, { text: action.text }]
    default:
      return state
  }
}
~~~
这就是单个 `reducer` 的格式，固定两个参数 `state` 和 `action`;

多个`reducers` 是需要使用 `combineReducers`,

~~~js
import {combineReducers} from 'redux';

const items = (state = [], action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, { text: action.text }]
    default:
      return state
  }
}

export default combineReducers({
  items
});
~~~

接下来，我们看看 combineReducers 里面实现了什么？

~~~js

function combineReducers(reducers) {
  // 多个reducer
  var reducerKeys = Object.keys(reducers);
  // 最终的 reducers
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers);
  var unexpectedKeyCache;

  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    //只是验证一下语法是否有错误
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }
  
  
  //返回一个 function(state, action){}
  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      //当前 key 的 reducer
      var reducer = finalReducers[_key];
      // 当前 key 的 state
      var previousStateForKey = state[_key];
      // 即将改变后的当前key 的 state
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      // 当前 reducer 的名字作为 key 保存在 state
      nextState[_key] = nextStateForKey;
      // 判断状态是否发生改变，当下一个状态不等于上一个状态，标识状态已改变
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    
    // 返回 state
    return hasChanged ? nextState : state;
  };
}

~~~




