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

	
### `this._init`

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






