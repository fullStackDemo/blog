import React, { lazy, Suspense } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Loading from '@c/Loading';
import ErrorBoundary from '@c/ErrorBoundary';

// lazy load
const lazyLoad = path =>
    lazy(() => {
        return new Promise(resolve => setTimeout(resolve, 3 * 1000)).then(() => import(`../pages/${path}`)).catch(() => import('../components/Error'));
    });

const App = lazyLoad('App');
const About = lazyLoad('About');
const HammerPan = lazyLoad('HammerPan');

// 路由配置
const routerConfig = [
    {
        path: '/',
        component: App
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/pan',
        component: HammerPan
    }
];

function AppRouter() {
    return (
        // catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI
        <ErrorBoundary>
            <Suspense fallback={<Loading />}>
                {/* 只有当你的应用部署到服务器的二级目录的时候，才需要设置basename */}
                {/* <Router basename="/"> */}
                <Router basename="/react">
                    <Switch>
                        {routerConfig.map((n, index) => {
                            return <Route path={n.path} exact component={n.component} key={index}></Route>;
                        })}
                    </Switch>
                </Router>
            </Suspense>
        </ErrorBoundary>
    );
}

export default AppRouter;
