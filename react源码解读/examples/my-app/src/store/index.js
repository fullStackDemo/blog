import { createStore } from 'redux';

import reducers from '../reducers';
import { addItem } from '../actions'

const store = createStore(reducers);

export default store;
