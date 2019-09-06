
// 点击外部隐藏
const getAllClass = _html => {
    // 前置判断 ie firefox不支持
    // const allClassName = _html.match(/(?<=class=")([^(<|>)]*)(?=")/g) || [];
    const allClassName = _html.match(/(?=class=")([^(<|>)]*)(?=")/g) || [];
    allClassName.forEach(n=>{
        n = n.replace(/class="/g, '');
    });
    // 有的情况会一个classname 会有多个 name,并且以空格分开
    let new_data = [];
    allClassName.forEach(n => {
        // 匹配多个class
        n = n.replace(/class="/g, '');
        const _n = n.replace(/\s+/g, '&');
        const multiClass = _n.split('&');
        new_data = new_data.concat(multiClass);
    });
    return new_data;
};

/**
 * v-outside
 * 点击外部，隐藏下拉框等
 */
export const outside = {
    bind: function (el, binding) {
        // 点击
        document.addEventListener('click', e => {
            const _html = el.outerHTML;
            const bind_classData = getAllClass(_html);
            const target = e.target;
            // 当前点击的 class 数组
            const currentClassData = target.className.replace(/\s+/g, '&').split('&');
            // 多个 class
            const isExist = bind_classData.find(n => currentClassData.includes(n));
            // 点击除了 搜索模块的所有节点，都会隐藏下拉选择框
            if (!isExist) {
                binding.value(e);
            }
        }, false);
    },
}


/**
 * input textarea 过滤非法字符
 * v-filter
 */
export const filterText = {
    bind: function(el, binding){
        console.log(el, binding);
        const value = el.value;        

    }
}