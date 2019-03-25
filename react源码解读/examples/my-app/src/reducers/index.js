import {combineReducers} from 'redux/lib/redux';

const items = (state = [], action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, { text: action.text }]
    default:
      return state
  }
}

const location = (state = window.location, action) => state;

export default combineReducers({
  items,
  location
});