import React from 'react';

// 过滤层入口组件
const Main = (mySetting = {}) => {
    // 默认设置
    const setting = {
        id: '', //当前模块 ID
        requestApi: '', //在 dataServer定义过的请求名字
        stop: false, //true 拦截请求  false不拦截请求
        data: null,
        component: <div></div>, //当前请求数据的组件
        // 请求成功的回调
        success: (res, state, props) => {
            return state;
        },
        // 请求失败的回调
        fail: (res, state, props) => {
            return state;
        }
    };

    // 覆盖自定义设置
    Object.keys(mySetting).forEach(n => {
        setting[n] = mySetting[n];
    });

    // 过滤入口组件
    class Index extends React.Component {
        constructor(props) {
            super(props);
            console.log(this);
        }
        render() {
            return <this.props.setting.component />;
        }
        componentDidMount() {}
    }

    Index.defaultProps = { setting };

    return Index;
};

export default Main;
