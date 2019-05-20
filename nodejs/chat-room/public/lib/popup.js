


(function (global, factory) {
    if (typeof define === 'function') {
        define(factory);
    } else {
        global.popup = factory();
    }
}(this, function () {

    //construction
    function Popup() {
        //insert content to body
        this.hash = '_p_' + Math.floor(Math.random() * 1e8);
        this.init = function (opts) {
            const isExist = document.querySelector('.popup-box' + this.hash);
            if (isExist) {
                isExist.style.display = 'block';
            } else {
                this.hash = '_p_' + Math.floor(Math.random() * 1e8);
                const box = document.createElement('div');
                this.box = box;
                box.className = 'popup-box' + this.hash;
                box.style.width = opts.width + 'px';
                box.style.position = 'absolute';
                box.style.zIndex = 666;
                box.style.background = 'rgba(0, 0, 0, .5)';
                box.style.lineHeight = opts.height + 'px';
                box.style.textAlign = 'center';
                box.style.borderRadius = '6px';
                box.style.color = 'white';
                box.style.left = '50%';
                box.style.top = '50%';
                box.style.marginLeft = -(opts.width / 2) + 'px';
                box.style.marginTop = -(opts.height / 2) + 'px';

                const content = document.createElement('span');
                content.className = 'popup-content';
                content.style.display = 'inline-block';
                content.style.lineHeight = 1.5;
                content.style.verticalAlign = 'middle';
                content.innerHTML = opts.content;
                box.appendChild(content);
                document.body.appendChild(box);
            }
            this.clickOutside();
        };

        //show control
        this.show = function (opts) {
            var _opts = {
                width: 300,
                height: 300,
                content: ''
            };
            var options = this.extend(_opts, opts || {});
            this.init(options);
            //定时关闭
            if (options.timer) {
                setTimeout(() => {
                    this.box.style.display = 'none';
                }, options.timer)
            }
        }

        //合并 后一个object到前面 object
        this.extend = function (m, n) {
            if (this.isObject(m) && this.isObject(n)) {
                for (var key in n) {
                    if (n.hasOwnProperty(key)) {
                        m[key] = n[key];
                    }
                }
                return m;
            }
        }

        this.isObject = function (m) {
            return Object.prototype.toString.call(m) == '[object Object]' ? true : false;
        };

        //hide
        this.hide = function () {
            this.box.style.display = 'none';
        }

        //点击外边关闭弹窗
        this.clickOutside = function () {
            document.onclick = e => {
                e.stopPropagation();
                this.box.style.display = 'none';
            }
            if (this.box) this.box.onclick = e => {
                e.stopPropagation();
            }
        }

    }

    return new Popup();

}));