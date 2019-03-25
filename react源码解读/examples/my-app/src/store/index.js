import { createStore } from 'redux/lib/redux.js';

import reducers from '../reducers';

const store = createStore(reducers);

store.subscribe(()=>{
  console.log('subscribe', store.getState())
});


export default store;
