// import _ from "lodash"
import text from './demo.txt'

function component() {
  let div = document.createElement('div');

  div.innerHTML = text;

  document.body.appendChild(div);
}


component()