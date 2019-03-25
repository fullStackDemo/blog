import {combineReducers} from 'redux';

const items = (state = [], action) => {
  debugger
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