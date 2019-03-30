// import _ from "lodash"
import text from './demo.txt'
import './style/index.css'

function component() {
  let div = document.createElement('div');

  div.innerHTML = text;

  document.body.appendChild(div);
}


component()