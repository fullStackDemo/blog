import React, { Component } from 'react';
import '@less/App';
import dataService from '../dataService';

import FetchData from '@c/FetchData';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        Go6688
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


export default FetchData({
    component: App
});
