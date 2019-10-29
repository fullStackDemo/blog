import 'react-app-polyfill/ie9';//兼容IE9以上 Object.assign|promise|symbol|window.fetch|Array.from
import 'react-app-polyfill/stable';//兼容其他方法属性
import React from 'react';
import ReactDOM from 'react-dom';
import '@less/index';
import App from './pages/App';
import Router from './router';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import "@less/sprite.less";

// import * as Sentry from '@sentry/browser';
// Sentry.init({dsn: "https://f5fe3d6e599849bfa1d1f0c26d1c3213@sentry.io/1729437"});

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
