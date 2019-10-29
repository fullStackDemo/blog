import React from 'react';
import { connect } from 'react-redux';
import dataService from '@/dataService';
import { merged } from '@util';
import action from '@/actions';

// 过滤层入口组件
const Main = (mySetting = {}) => {
    // 默认设置
    const setting = {
        id: '', //当前模块 ID
        stop: false, //true 拦截请求  false不拦截请求
        requestApi: '', //在 dataServer定义过的请求名字
        requestOption: {}, //请求参数
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
            this.state = {};
            console.log('Fetch == ', this);
            //请求数据
            this.dispatchRequest = () => {
                const { requestApi, requestOption, success, fail, stop } = this.props.setting;
                // 拦截请求
                if (stop) return;
                let _state = merged({}, this.state);
                let _props = merged({}, this.props);
                if (dataService[requestApi]) {
                    dataService[requestApi]({
                        ...requestOption
                    })
                        .then(res => {
                            _state.loadingStatus = 'success';
                            _state = success(res, _state, _props);
                            this.props._setState(_state);
                            this.setState(_state);
                        })
                        .catch(error => {
                            _state.loadingStatus = 'failed';
                            _state = fail({ error }, _state, _props);
                            this.props._setState(_state);
                        });
                }
            };

            // initState
            this.initState = props => {
                const { state } = props;
                if (state.path && Object.keys(state.path).length) {
                    this.state = merged(state.path, state.defaults);
                } else {
                    this.state = merged(state.defaults);
                }
            };

            this.initState(this.props);
        }

        render() {
            console.log('Fetch == render');
            return <this.props.setting.component {...this.props} state={this.state} />;
        }

        componentDidMount() {
            console.log('Fetch == DidMount');
            this.dispatchRequest();
        }

        componentWillReceiveProps(np) {
            console.log('Fetch == np', np);
        }

        componentDidUpdate() {
            console.log('Fetch == componentDidUpdate');
        }
    }

    Index.defaultProps = { setting };

    return connect(
        // mapStateToProps
        (state, ownProps) => {
            return {
                state: state[setting.id]
            };
        },
        // mapDispatchToProps (function or object)
        (dispatch, ownProps) => {
            return {
                _setState: data => {
                    dispatch(action(setting.id, data));
                }
            };
        }
    )(Index);
};

export default Main;
