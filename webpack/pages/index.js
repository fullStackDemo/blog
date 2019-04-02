// import _ from "lodash"
import text from './demo.txt'
import './style/index.css'
// import val from './test/val.js'
const val = require('./test/val')
import img from './assets/data.png'
import img_new from './assets/test.png'

function component() {
  let div = document.createElement('div');

  div.innerHTML = text + val;

  document.querySelector('.img').src = img;
  document.querySelector('.img_new').src = img_new;

  document.body.appendChild(div);
}


component()