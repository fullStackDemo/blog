import { createStore } from 'redux/lib/redux';

import reducers from '../reducers';
import { addItem } from '../actions'



const store = createStore(reducers);

export default store;
