import merge from 'lodash.merge';

// 深层复制
export const deepCopy = (obj = {}) => {
    return JSON.parse(JSON.stringify(obj));
};

// Convert String to DOM Nodes
export const convertStringToNodes = str => {
    // 第一种方法 DOMParse
    str = `<div><span>hello</span></div>`;
    let doc = new DOMParser().parseFromString(str, 'text/html');
    let nodes = doc.body.firstChild;

    // 第二种方法 性能更佳
    nodes = document.createRange().createContextualFragment(str);

    return nodes;
};

// merged
export const merged = merge;

