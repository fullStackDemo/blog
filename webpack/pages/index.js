import _ from "lodash"

function component() {
  let div = document.createElement('div');

  div.innerHTML = _.join(['Hello', 'webpack']);

  document.body.appendChild(div);
}

component()