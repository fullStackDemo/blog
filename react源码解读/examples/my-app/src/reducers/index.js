import {combineReducers} from 'redux';

const items = (state = [], action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, { text: action.text }]
    default:
      return state
  }
}


export default combineReducers({
  items
});