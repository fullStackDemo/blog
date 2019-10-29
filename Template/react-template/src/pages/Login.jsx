import React, { Component } from 'react';
import dataService from '../dataService';
import '@less/login';
import FetchData from '@c/FetchData';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        Go66888899999login
                    </a>
                </header>
            </div>
        );
    }

    componentWillMount() {
        // dataService.addBookmark({
        //     title: "test0000",
        //     url: "http://baidu.com",
        // }).then(res=>{
        //     console.log(res);
        // });
        dataService
            .getCaptcha({
                code: 11
            })
            .then(res => {
                console.log(res);
            });
    }
}

class Svg extends Component {
    constructor(props) {
        super(props);
        console.log(this);
    }

    render() {
        return <div></div>;
    }
}

export default FetchData({
    id: 'Login',
    // 是否拦截请求
    stop: false,
    component: Login,
    // 在 dataService定义好的名字
    requestApi: 'getCaptcha',
    // 请求数据
    requestOption: {
        code: 11
    },
    // 成功的回调处理
    success: (res, state, props) => {
        state = merge(state, res);
        return state;
    },
    // 失败的回调处理
    fail: (res, state, props) => {
        state = merge(state, res);
        return state;
    }
});
