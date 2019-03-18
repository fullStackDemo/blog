import { createStore } from 'redux';

import reducers from '../reducers';
import { addItem } from '../actions'

const store = createStore(reducers);

console.log(store);

// store.dispatch(addItem(88));
// store.dispatch(addItem(88));
// store.dispatch(addItem(88));

// console.log(store.getState());

store.subscribe(()=> console.log('>>>>', store.getState()))

export default store;
