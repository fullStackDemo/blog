import _ from 'lodash';
import styleName from '@css/index';
import image1 from './assets/1.jpg';

function component() {
    let element = document.createElement('div');
    let image = document.createElement('img');
    element.innerHTML = _.join(['Hello', 'World888']) + '<span class="' + styleName.demo + ' ' + styleName.common + '">====66====8888888888888</span>';
    image.src = image1;
    element.append(image);
    return element;
}

const div = component();

document.body.append(div);
