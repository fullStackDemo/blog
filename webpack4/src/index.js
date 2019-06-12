// import _ from 'lodash';
import join from 'lodash/join';

function component() {

  let element = document.createElement('div');
  // element.innerHTML = _.join(['Hello', 'World']);
  element.innerHTML = join(['Hello', 'World']);

  return element;

}

const div = component();

document.body.append(div);