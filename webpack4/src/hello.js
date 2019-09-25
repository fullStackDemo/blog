import _ from 'lodash';

function component() {
  let element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'World']);

  return element;
}

const div = component();

document.body.append(div);
