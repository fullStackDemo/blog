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

接下来，我们看看 `combineReducers` 里面实现了什么？

### `combineReducers` ###

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
  // dispatch 会调用这里的 function
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
      // 所以 当前例子 items 会变成 state.items = []
      nextState[_key] = nextStateForKey;
      // 判断状态是否发生改变，当下一个状态不等于上一个状态，标识状态已改变
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    
    // 返回 state
    return hasChanged ? nextState : state;
  };
}

~~~


### `Store` ###

`store`是什么？ `store` 是把 `Actions` 和 `Reducers` 通过`createStore`结合起来的一个`Object`。

打印一下：
~~~js
Store: {
  getState,
  dispatch,
  subscribe
  replaceReducer,
}
~~~

### `createStore(reducer, preloadState, enhancer)` ###

~~~js

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */
export default function createStore(reducer, preloadedState, enhancer) {
  if (
    (typeof preloadedState === 'function' && typeof enhancer === 'function') ||
    (typeof enhancer === 'function' && typeof arguments[3] === 'function')
  ) {
    throw new Error(
      'It looks like you are passing several store enhancers to ' +
        'createStore(). This is not supported. Instead, compose them ' +
        'together to a single function'
    )
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }

    return enhancer(createStore)(reducer, preloadedState)
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }

  let currentReducer = reducer
  let currentState = preloadedState
  let currentListeners = []
  let nextListeners = currentListeners
  let isDispatching = false

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    if (isDispatching) {
      throw new Error(
        'You may not call store.getState() while the reducer is executing. ' +
          'The reducer has already received the state as an argument. ' +
          'Pass it down from the top reducer instead of reading it from the store.'
      )
    }

    return currentState
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.')
    }

    if (isDispatching) {
      throw new Error(
        'You may not call store.subscribe() while the reducer is executing. ' +
          'If you would like to be notified after the store has been updated, subscribe from a ' +
          'component and invoke store.getState() in the callback to access the latest state. ' +
          'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
      )
    }

    let isSubscribed = true

    ensureCanMutateNextListeners()
    
    // 保存监听 回调函数 等 dispatch 时候 统一执行
    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      if (isDispatching) {
        throw new Error(
          'You may not unsubscribe from a store listener while the reducer is executing. ' +
            'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
        )
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
          'Use custom middleware for async actions.'
      )
    }

	 // 这里说明 actions 必须包含 type 否则报错
    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
          'Have you misspelled a constant?'
      )
    }

	 // 一次只能分派一个action
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      // dispatch分配时候，设置标识
      isDispatching = true
      // 使用 combination(state, action) 获取当前 state
      currentState = currentReducer(currentState, action)
    } finally {
      // 执行完毕 设置 false
      isDispatching = false
    }

	 /**
	 * 这里的 listeners 是 subcribe 订阅的 callback
	 * 所以每次 dispatch , 都会触发 订阅的 callback
 	 */ 
    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }

    return action
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }

    currentReducer = nextReducer
    dispatch({ type: ActionTypes.REPLACE })
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    const outerSubscribe = subscribe
    return {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.')
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState())
          }
        }

        observeState()
        const unsubscribe = outerSubscribe(observeState)
        return { unsubscribe }
      },

      [$$observable]() {
        return this
      }
    }
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT })

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}
~~~

这里的`createStroe`,在新建`store`的时候，会默认执行 

~~~js
dispatch({ type: ActionTypes.INIT })
~~~

然后执行,

~~~js
currentState = currentReducer(currentState, action)
~~~

这里的 `currentReducer` 就是 `createStrore(reducer)` 里面的参数 `reducer`, 也就是`combineReducers` 函数的返回函数 `combination(state, action)`, 让我们再回顾一下 `combination` 里面说的什么；

### `combination(state, action)`

~~~js

function combination(state, action) {
	// 设置 state = {}
	if (state === void 0) {
	  state = {};
	}
	
	if (shapeAssertionError) {
	  throw shapeAssertionError;
	}
	
	// 错误提示
	if (process.env.NODE_ENV !== 'production') {
	  var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
	
	  if (warningMessage) {
	    warning(warningMessage);
	  }
	}
	
	var hasChanged = false;
	var nextState = {};// 设置下一状态
	   
	/**
	* 例子中有两个 reducer (items, location)
	* const items = (state = [], action) => {
		  switch (action.type) {
		    case "ADD_ITEM":
		      return [...state, { text: action.text }]
		    default:
		      return state
		  }
	  }
	* const location = (state = window.location, action) => state;
	* 
	* combineReducers({items, location})
	* 此时的 finalReducerKeys = [items, location]
	* finalReducers={
		 items: function items(){},
		 location: function location()
	  }
	  
	* 实现过程：
	* 
	* loop 1:
	* 	_key = items;
	* 	reducer = function items(){}
	*  previousStateForKey = undefined
	*  nextStateForKey = items(undefined, {type: '@@redux/INIT.....'}) = []
	*  nextState = {items: []}
	*  
	* loop 2:
	* 	_key = location;
	*  reducer = function location(){}
	*  previousStateForKey = undefined
	*  nextStateForKey = location(undefined, {type: '@@redux/INIT.....'}) = window.location
	*  nextState = {items: [], location: window.location}
	*  
	*/
	for (var _i = 0; _i < finalReducerKeys.length; _i++) {
	  var _key = finalReducerKeys[_i];
	  var reducer = finalReducers[_key];
	  // 读取 state 里面的上一个状态
	  var previousStateForKey = state[_key];
	  // 获取 下一个 state 状态 并且 合并数据
	  var nextStateForKey = reducer(previousStateForKey, action);
	
	  if (typeof nextStateForKey === 'undefined') {
	    var errorMessage = getUndefinedStateErrorMessage(_key, action);
	    throw new Error(errorMessage);
	  }
	
	  // 赋值返回 nextState
	  nextState[_key] = nextStateForKey;
	  hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	}
	
	return hasChanged ? nextState : state;
};
~~~

### `getState()`

`getState` 这个方法就很简单了，只是返回 `currentState`。

### `subscribe(listener)`

订阅这块，就是保持每一个`listener callback` 到 `listeners` 数组里，等到 执行 `dispatch(action)`, 再一个个循环执行。最有意思的就是返回值是一个 `unsubscribe function`, 顾名思义就是解除订阅，用法稍后再说。

### `replaceReducer(nextReducer)`

其实就替换`reducer`, 一般热加载的时候会用到。










