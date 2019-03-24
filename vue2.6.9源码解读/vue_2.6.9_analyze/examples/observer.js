function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) == '[object Object]'
}

//监听 array 的每个方法
var arrayMethods = Object.create(Array.prototype);

[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) {
  var originMethod = arrayMethods[method];
  Object.defineProperty(arrayMethods, method, {
    configurable: true,
    writable: true,
    enumerable: true,
    value: function mutator(...args) {
      const result = originMethod.apply(this, args);
      dep.notify();
      return result;
    }
  })
})

// observer
const dep = new Dep();

function Observer(obj, key) {
  let value = obj[key];
  if (isPlainObject(value)) {
    Object.keys(value).forEach(k => {
      //Object
      Observer(value, k)
    })

  } else if (Array.isArray(value)) {
    //遍历
    value.__proto__ = arrayMethods;
    value.forEach(m => {
      if (isPlainObject(m)) {
        Object.keys(m).forEach(j => {
          Observer(m, j);
        })
      }
    });
  }

  console.log('observer', obj, key);

  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get: function Getter() {
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return value;
    },
    set: function Setter(newVal) {
      value = newVal;
      dep.notify();
    }
  });
}

function Watcher(fn) {
  this.update = function () {
    Dep.target = this;
    fn();
    Dep.target = null;
  }
  this.update();
}

function Dep() {
  this.subs = [];
  this.addSub = function (watcher) {
    this.subs.push(watcher);
  }
  this.notify = function () {
    this.subs.forEach(watcher => {
      watcher.update();
    })
  }
}

var obj = {
  a: 88,
  b: {
    name: 'wz'
  },
  arr: [
    {
      name: 'w'
    },
    {
      name: 'alex'
    }
  ]
}
Object.keys(obj).forEach(key => {
  new Observer(obj, key)
})

new Watcher(function () {
  document.querySelector('#test1').innerHTML = obj.a;
  document.querySelector('#test2').innerHTML = obj.b.name;
  document.querySelector('#test3').innerHTML = '';
  obj.arr.forEach(n => {
    const p = document.createElement('p');
    p.innerText = JSON.stringify(n);
    document.querySelector('#test3').appendChild(p);
  })
})
