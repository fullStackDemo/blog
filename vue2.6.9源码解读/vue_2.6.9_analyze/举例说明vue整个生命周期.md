## example

这里我们只是引用js, 不利用`vue-cli`去生成一个demo，这样我们可以更加清晰了解这是怎么的一个过程：

~~~html
<!-- development version, includes helpful console warnings -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<div id="app">
      {{ message }}
    </div>
<script>
  var app = new Vue({
    el: '#app',
    data: {
      message: 'welcome to the text section'
    }
  })
</script>
~~~
    
首先 必须使用 new Vue() 这个原因不再赘述，接下来让我们从 Vue 最初的构造函数开始讲起

~~~javascript
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
~~~

	
## `this._init`

~~~js
//this._init
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++
	
    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) 		{
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }
	
    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
	
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) 		{
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }
	
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
}
~~~

`vm._uid` vue 给当前的 vm 赋予了唯一的 `_uid` ，然后设置`vue._isVue`(监听对象变化时过滤vm)。
`options._isComponent`在内部创建子组件的时候才是`true`，目前例子中走`else`里面的逻辑。`mergeOptions`是用来合并两个对象，并且对数据做了一定的操作，不只是`Object.assign`的简单合并。

## `resolveConstructorOptions`

`resolveConstructorOptions`方法在`Vue.extend`中做了详细的解释，它的作用是合并构造器及构造器父级上定义的`options`。

~~~js
export function resolveConstructorOptions (Ctor: Class<Component>) {
  let options = Ctor.options;
  //有super属性，说明是Ctor是通过`Vue.extend()`创建的子类
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}
~~~

`Ctor == vm.constructor == Vue对象`，`ctor.options`正是我们在`src/core/index.js`里面`initGlobalApi(Vue)`产生的，代码如下在`src/core/global-api/index.js`中：

### `Ctor.options == Vue.options`

~~~js
 Vue.options = Object.create(null)
 // ASSET_TYPES = [
 // 'component',
 // 'directive',
 // 'filter'
 // ]

  //Vue.options.components | Vue.options.directivea | Vue.options.filters
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  
  //Vue.options._base 等于本身
  Vue.options._base = Vue
  
  //builtInComponents == keepAlive
  //Vue.options.components.KeepAlive
  extend(Vue.options.components, builtInComponents)
  
~~~

so, `Ctor.options` 如图

![](./images/ctor.png)


`Ctor.super`是在调用`Vue.extend`时，才会添加的属性，这里先直接跳过。所以`mergeOptions`的第一个参数就是上面的`Ctor.options`，第二个参数是我们传入的`options`，第三个参数是当前对象`vm`。

## `mergeOptions`

`mergeOptions`是`Vue`中处理属性的合并策略的

~~~js
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
export function mergeOptions (
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  if (process.env.NODE_ENV !== 'production') {
  	 //如果有options.components, 判断组件是否合法
    checkComponents(child)
  }

  //第一次child === {el, data, props} 如果不是Object, 则走下面
  //如果 vue.extend 扩展子类组件的时候 type 就是function
  if (typeof child === 'function') {
    child = child.options
  }

  /**
  * 格式化 props
  * 只能是 Array or Object
  * props: [propName] 
  * or
  * props: {propName:{handle:function(), deep: Boolean}}
  */
  normalizeProps(child, vm)
  
  /**
  * 格式化 inject
  * 
  */
  normalizeInject(child, vm)
  
  /**
  * 格式化指令 directive
  * directives:{
      //object
      focus: {
        inserted: function(el){
          el.focus()
        }
      },
      //function
      color: function(el, binding){
        console.log(binding); 
        el.style.color = binding.value;
      }
    }
    
    ===格式化后===
    
    directives:{
      //object
      focus: {
        inserted: function(el){
          el.focus()
        }
      },
      //function
      color: {
      	bind:function(el, binding){
    		console.log(binding); 
    		el.style.color = binding.value;
      	},
      	update:function(el, binding){
    		console.log(binding); 
    		el.style.color = binding.value;
      	},
      }
    }
  */
  normalizeDirectives(child)

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  
  //只有合并过的options才有_base, 初始化对象才可以有以下处理
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm)
    }
    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm)
      }
    }
  }

  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}
~~~

前面和`components`、`props`、`directives`、`extends`、`mixins`相关的内容我们暂且忽略，我们知道`Vue`提供了配置`optionMergeStrategies`对象，来让我们手动去控制属性的合并策略，这里的`strats[key]`就是key属性的合并方法。

~~~js
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
): Object {
  const res = Object.create(parentVal || null)
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm)
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets
})
~~~

`ASSET_TYPES`就是`components`、`directives`、`filters`，这三个的合并策略都一样，这里我们都返回了`parentVal`的一个子对象。

data属性的合并策略，是也是Vue内置的，如下：

~~~js
/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to: Object, from: ?Object): Object {
  if (!from) return to
  let key, toVal, fromVal

  const keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from)

  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    // in case the object is already observed...
    if (key === '__ob__') continue
    toVal = to[key]
    fromVal = from[key]
    if (!hasOwn(to, key)) {
      set(to, key, fromVal)
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal)
    }
  }
  return to;
}
~~~

~~~js
strats.data = function (
  parentVal: any,
  childVal: any,
  vm?: Component
): ?Function {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      )

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
}
~~~
### `mergeDataOrFn`

~~~js
/**
* Data
*/
function mergeDataOrFn(
	parentVal,
	childVal,
	vm
) {
	if (!vm) {
	  // in a Vue.extend merge, both should be functions
	  if (!childVal) {
	    return parentVal
	  }
	  if (!parentVal) {
	    return childVal
	  }
	  // when parentVal & childVal are both present,
	  // we need to return a function that returns the
	  // merged result of both functions... no need to
	  // check if parentVal is a function here because
	  // it has to be a function to pass previous merges.
	  return function mergedDataFn() {
	    return mergeData(
	      typeof childVal === 'function' ? childVal.call(this, this) : childVal,
	      typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
	    )
	  }
	} else {
	  return function mergedInstanceDataFn() {
	    // instance merge
	    var instanceData = typeof childVal === 'function'
	      ? childVal.call(vm, vm)
	      : childVal;
	    var defaultData = typeof parentVal === 'function'
	      ? parentVal.call(vm, vm)
	      : parentVal;
	    if (instanceData) {
	      return mergeData(instanceData, defaultData)
	    } else {
	      return defaultData
	    }
	  }
	}
}
~~~
这里`vm`且`data`都不为空，所以会走到 else if，返回的是`mergedInstanceDataFn`方法。关于`mergedInstanceDataFn`方法，我们都知道，子组件中定义`data`时，必须是一个函数，这里简单的判断了是函数就执行，不是就返回自身的值。然后通过`mergeData`去合并，其实就是递归把`defaultData`合并到`instanceData`，并观察。

~~~js

vue.$options:

	components: {}
	created: [ƒ]
	data: ƒ mergedInstanceDataFn()
	directives: {focus: {…}, color: {…}}
	el: "#app"
	filters: {}
	props: {name: {…}}
	render: ƒ anonymous( )
	staticRenderFns: []
	_base: ƒ Vue(options)
	_propKeys: ["name"]
	__proto__: Object
	
~~~

## `proxy`

_init()里面接下来代码是判断是否走代理，开发环境，则vm._renderProxy值为一个Proxy代理对象，生产环境就是vm自身,稍后再讲解proxy

~~~js
/* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    
    //initProxy
    initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      const options = vm.$options
      const handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler
      vm._renderProxy = new Proxy(vm, handlers)
    } else {
      vm._renderProxy = vm
    }
  }
~~~


接下来就是初始化生命周期

## `initLifecycle`

~~~js

export function initLifecycle (vm: Component) {
  const options = vm.$options

  // locate first non-abstract parent
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }

  vm.$parent = parent
  vm.$root = parent ? parent.$root : vm

  vm.$children = []
  vm.$refs = {}

  vm._watcher = null
  vm._inactive = null
  vm._directInactive = false
  vm._isMounted = false
  vm._isDestroyed = false
  vm._isBeingDestroyed = false
}
~~~

该过程主要就是给vm对象添加了`$parent`、`$root`、`$children`属性，以及一些其它的生命周期相关的标识。

`options.abstract`用于判断是否是抽象组件，组件的父子关系建立会跳过抽象组件，抽象组件比如`keep-alive`、`transition`等。所有的子组件`$root`都指向顶级组件。

## `initEvents `

~~~js
export function initEvents (vm: Component) {
  vm._events = Object.create(null)
  vm._hasHookEvent = false
  // init parent attached events
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}
~~~

该方法初始化事件相关的属性，_parentListeners是父组件中绑定在自定义标签上的事件，供子组件处理

~~~js
export function initRender (vm: Component) {
  vm._vnode = null // the root of the child tree
  vm._staticTrees = null // v-once cached trees
  const options = vm.$options
  const parentVnode = vm.$vnode = options._parentVnode // the placeholder node in parent tree
  const renderContext = parentVnode && parentVnode.context
  vm.$slots = resolveSlots(options._renderChildren, renderContext)
  vm.$scopedSlots = emptyObject
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  const parentData = parentVnode && parentVnode.data

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$attrs is readonly.`, vm)
    }, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$listeners is readonly.`, vm)
    }, true)
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true)
  }
}
~~~

这里给vm添加了一些虚拟dom、slot等相关的属性和方法

然后开始调用`beforeCreate`钩子方法

~~~js

callHook(vm, 'beforeCreate')

~~~


接下来在 data / props 处理之前，进行 `注入` 操作

## `initInjections `

~~~js

//initProvide
export function initProvide (vm: Component) {
  const provide = vm.$options.provide
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide
  }
}


//initInjections
export function initInjections (vm: Component) {
  const result = resolveInject(vm.$options.inject, vm)
  if (result) {
    //不会被观察到
    toggleObserving(false)
    Object.keys(result).forEach(key => {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], () => {
          warn(
            `Avoid mutating an injected value directly since the changes will be ` +
            `overwritten whenever the provided component re-renders. ` +
            `injection being mutated: "${key}"`,
            vm
          )
        })
      } else {
        defineReactive(vm, key, result[key])
      }
    })
    toggleObserving(true)
  }
}
~~~
这两个配套使用，用于将父组件_provided中定义的值，通过inject注入到子组件，且这些属性不会被观察。简单的例子如下：

~~~js
  <div id="app">
  	<Demo /> /** demo bar bar1 **/
  </div>
  
  var app = new Vue({
    el: '#app',
    data: {
      message: '88',
      color:'red',
    },
    created(){
      console.log('component hook called');    
    },
    provide:{
      foo: 'bar',
      foo1: 'bar1',
    },
    components:{
      Demo: {
        inject:['foo', 'foo1'],
        template: '<div>demo {{foo}} {{foo1}}</div>'
      }
    }
  })

</script>
~~~

## `initState(vm)`
~~~js
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
~~~

这里主要就是操作数据了，`props`、`methods`、`data`、`computed`、`watch`，从这里开始就涉及到了`Observer`、`Dep`和`Watcher`，网上讲解双向绑定的文章很多，之后我也会单独去讲解这一块。而且，这里对数据操作也比较多，在讲完双向绑定的内容后，有时间我们再来说一说`Vue`对我们传入的数据都进行了什么操作。

到这一步，我们看看我们的`vm`对象变成了什么样：

~~~js
$attrs: (...)
$children: [VueComponent]
$createElement: ƒ (a, b, c, d)
$el: div#app
$listeners: (...)
$options:
components: {Demo: {…}}
created: (2) [ƒ, ƒ]
data: ƒ mergedInstanceDataFn()
directives: {focus: {…}, color: {…}}
el: "#app"
filters: {}
methods: {hello: ƒ}
mixins: [{…}]
provide: ƒ mergedInstanceDataFn()
render: ƒ anonymous( )
staticRenderFns: []
_base: ƒ Vue(options)
__proto__: Object
$parent: undefined
$refs: {}
$root: Vue {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
$scopedSlots: {}
$slots: {}
$vnode: undefined
color: (...)
hello: ƒ ()
message: (...)
mixins: (...)
__VUE_DEVTOOLS_ROOT_UID__: 1
__VUE_DEVTOOLS_UID__: "1:0"
_c: ƒ (a, b, c, d)
_data: {__ob__: Observer}
_directInactive: false
_events: {hook:beforeDestroy: Array(1)}
_hasHookEvent: true
_inactive: null
_isBeingDestroyed: false
_isDestroyed: false
_isMounted: true
_isVue: true
_provided: {foo: "bar", foo1: "bar1"}
_renderProxy: Proxy {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
_self: Vue {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
_staticTrees: null
_uid: 0
_vnode: VNode {tag: "div", data: {…}, children: Array(7), text: undefined, elm: div#app, …}
_watcher: Watcher {vm: Vue, deep: false, user: false, lazy: false, sync: false, …}
_watchers: [Watcher]
$data: (...)
$isServer: (...)
$props: (...)
$ssrContext: (...)
get $attrs: ƒ reactiveGetter()
set $attrs: ƒ reactiveSetter(newVal)
get $listeners: ƒ reactiveGetter()
set $listeners: ƒ reactiveSetter(newVal)
get color: ƒ proxyGetter()
set color: ƒ proxySetter(val)
get message: ƒ proxyGetter()
set message: ƒ proxySetter(val)
get mixins: ƒ proxyGetter()
set mixins: ƒ proxySetter(val)
__proto__: Object

~~~

~~~js
每个阶段产物不同：
//_init
vm._uid = 0
vm._isVue = true
vm.$options = {
	components:{Demo:{...}},
	filters:{},
	directives:{focus:{...}, color:{...}},
	el:'#app',
	_base: Vue,
	....	
}

vm._renderProxy = vm
vm._self = vm;

// initLifeCycle
vm.$parent = parent;
vm.$root = parent ? parent.$root : vm;

vm.$children = [];
vm.$refs = {};

vm._watcher = null;
vm._inactive = null;
vm._directInactive = false;
vm._isMounted = false;
vm._isDestroyed = false;
vm._isBeingDestroyed = false;

// initEvents
vm._events = Object.create(null);
vm._hasHookEvent = false;

// initRender
vm._vnode = null; // the root of the child tree
vm._staticTrees = null; // v-once cached trees
vm.$slots = resolveSlots(options._renderChildren, renderContext);
vm.$scopedSlots = emptyObject;
// bind the createElement fn to this instance
// so that we get proper render context inside it.
// args order: tag, data, children, normalizationType, alwaysNormalize
// internal version is used by render functions compiled from templates
vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
// normalization is always applied for the public version, used in
// user-written render functions.
vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

// initState
vm._data
vm._watchers = []

~~~
然后，就会调用我们的`created`钩子函数。

我们看到`create`阶段，基本就是对传入数据的格式化、数据的双向绑定、以及一些属性的初始化。
