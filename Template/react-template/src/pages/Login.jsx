import React, { Component } from 'react';
import dataService from '../dataService';
import '@less/login';
import getData from '@util/getData';

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
                    <Svg name="88"></Svg>
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

export default Login
