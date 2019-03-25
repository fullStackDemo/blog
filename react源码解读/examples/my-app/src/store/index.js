import { createStore } from 'redux/lib/redux.js';

import reducers from '../reducers';
import { addItem } from '../actions'



const store = createStore(reducers);

export default store;
