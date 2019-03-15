## component(react v16.8.4) ##


    
    import React, { Component } from 'react';
    import logo from './logo.svg';
    import './App.css';
    
    class App extends Component {
      render() {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        );
      }
    }
    
    const tem = <App name="wz" key="55">111</App>
    
    console.log(tem, Object.keys(tem));
    
    
    export default App;
    
    
  打印台
  
  ![](https://i.imgur.com/kHYhycT.png)
  
  components >> App这里其实是一个ReactElement
  
  ReactElement 又是什么呢？
  
    var ReactElement = function (type, key, ref, self, source, owner, props) {
      var element = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,
    
        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,
    
        // Record the component responsible for creating this element.
        _owner: owner
      };
    
      {
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {};
    
        // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.
        Object.defineProperty(element._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        });
        // self and source are DEV only properties.
        Object.defineProperty(element, '_self', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        });
        // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.
        Object.defineProperty(element, '_source', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });
        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }
    
      return element;
    };
  
  
  由此看到：
  reactElement 里面有以下属性：
  >$$typeof(可以遍历到): ----- $$typeof: Symbol(react.element) 标记是否是一个react element 元素。

  >props(可以遍历到)： 组件数据，使用Object.freeze()冻结了，包括element冻结了，不过element._store.validated 并没有被冻结，可以用来验证是否是react element。
  
  >
  
  
  