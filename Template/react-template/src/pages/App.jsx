import React, { Component } from 'react';
import '@less/App';

import dataService from '../dataService';

import FetchData from '@c/FetchData';

import { merged } from '@util';


class App extends Component {
    constructor(props) {
        super(props);
        console.log('app', this);
        this.state = this.props.state;

        // 绑定作用域
        this.handleNav = this.handleNav.bind(this);
    }

    render() {
        console.log('render');
        const { state } = this.props;
        console.log('path', JSON.stringify(state));
        const { handleNav } = this;
        return (
            <div className="App">
                <img src={state ? state.data : ''} />
                <div className="block">
                    666 test gzip_static
                </div>
                {/* <a href="/about">about</a> */}
                <a onClick={handleNav}>about</a>
                <span className="sprite_ico sprite_ico_guzhi"></span>
            </div>
        );
    }

    componentDidMount() {
        console.log('Did', this.props);
    }

    componentWillReceiveProps(np) {
        console.log('66', np);
    }

    handleNav() {
        console.log(this);
        this.props.history.push('/about')
    }
}

export default FetchData({
    id: 'App',
    // 是否拦截请求
    stop: false,
    component: App,
    // 在 dataService定义好的名字
    requestApi: 'getCaptcha',
    // 请求数据
    requestOption: {
        code: 11
    },
    // 成功的回调处理
    success: (res, state, props) => {
        state = merged(state, res);
        return state;
    },
    // 失败的回调处理
    fail: (res, state, props) => {
        state = merged(state, res);
        return state;
    }
});
