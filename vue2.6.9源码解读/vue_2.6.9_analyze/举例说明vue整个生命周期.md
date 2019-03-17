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




