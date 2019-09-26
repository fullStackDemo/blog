import _ from 'lodash';
import "@css/hello";


function component() {
  let element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'World999']);
  return element;
}

const div = component();

document.body.append(div);
