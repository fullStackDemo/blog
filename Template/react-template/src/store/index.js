import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
// console.log(reducer);
const middleware = [thunk];

const enhancer = composeWithDevTools(
    applyMiddleware(...middleware),
);

var store = createStore(
    combineReducers(reducer),
    enhancer
);

export default store;