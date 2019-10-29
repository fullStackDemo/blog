import {
    merged
} from "@util";

// 统一处理函数
const DB = (moduleID, initState) => {

    // 回调处理函数
    const cb = {
        // 默认数据
        setDefault: () => {
            const defaults = merged({
                loadingMessage: "正在加载中"
            }, initState);
            return {
                defaults,
                path: {}
            }
        }
    }
    // console.log("=====", moduleID);
    return (state = {}, action) => {
        // 重复
        if (action.id && action.id != moduleID) {
            return state;
        } else {
            switch (action.type) {
                case 'setState':
                    console.log("setState ====== reduce");
                    const data = cb.setDefault();
                    // 清空否则不会更新
                    data.path = null;
                    data.path = merged({}, action.target);
                    return merged(state, data);
                default:
                    return cb.setDefault();
            }
        }
    }
};

const App = DB("App", {
    app: true
});
const Login = DB("Login", {
    login: true
});

export default {
    Login,
    App,
}



// export const App = (state = {}, action) => {
//     switch (action.type) {
//         case 'setState':
//             return Object.assign({}, state, action.target)
//         default:
//             return state
//     }
// };