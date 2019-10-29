/**
 * Merges JavaScript objects recursively without altering the objects merged.
 * @param {Object} shadows [[shadows]...] One or more objects to merge. Each
 *  argument given will be treated as an object to merge. Each object
 *  overwrites the previous objects descendant properties if the property name
 *  matches. If objects properties are objects they will be merged recursively
 *  as well.
 * @returns {Object} Returns a single merged object composed from clones of the
 *  input objects.
 * @example
 *  const x = {
 *      a : 'a',
 *      b : 'b',
 *      c : {
 *          d : 'd',
 *          e : 'e',
 *          f : {
 *              g : 'g'
 *          }
 *      }
 *  };
 *  const y = {
 *      a : '`a',
 *      b : '`b',
 *      c : {
 *          d : '`d'
 *      }
 *  };
 *  const z = {
 *      a : {
 *          b : '``b'
 *      },
 *      fun : function foo () {
 *          return 'foo';
 *      },
 *      aps : Array.prototype.slice
 *  };
 *  const out = merged(x, y, z);
 *  // out.a will be {
 *  //         b : '``b'
 *  //     }
 *  // out.b will be '`b'
 *  // out.c will be {
 *  //         d : '`d',
 *  //         e : 'e',
 *  //         f : {
 *  //             g : 'g'
 *  //         }
 *  //     }
 *  // out.fun will be a clone of z.fun
 *  // out.aps will be equal to z.aps
 */
// 遍历 Object
const objectForeach = (obj, callback) => {
    Object.keys(obj).forEach(n => {
        callback(obj[n], n);
    });
    return obj;
}

//Clones non native JavaScript functions, or references native functions
const cloneFunction = func => {
    let str, out;
    try {
        str = func.toString();
        if (/\[native code\]/g.test(str)) {
            out = func;
        } else {
            out = eval("(function(){return " + str + "}());");
        }
    } catch (error) {
        throw new Error(func, error);
    }
    return out;
};

// merge options
const ObjectMergeOptions = function (opts) {
    opts = opts || {};
    this.depth = opts.depth || false;
    this.throwOnCircularRef = 'throwOnCircularRef' in opts && opts.throwOnCircularRef === false ? false : true;
};

// create options
const createOptions = function () {
    const args = Array.prototype.slice.call(arguments, 0);
    args.unshift(null);
    const F = Function.bind.apply(ObjectMergeOptions, args);
    console.log(F.prototype)
    return new F();
}


// merged
const objectMerged = function (shadows) {

    // various merge options
    let options = {};

    if (arguments[0] instanceof ObjectMergeOptions) {
        options = arguments[0];
        shadows = Array.prototype.slice.call(arguments, 1);
    } else {
        options = createOptions();
        shadows = Array.prototype.slice.call(arguments, 0);
    }

    // 获取输出的 Object 类型
    const getOutputObject = function (shadows) {
        let out;
        const lastShadow = shadows[shadows.length - 1];
        if (lastShadow instanceof Array) {
            out = [];
        } else if (lastShadow instanceof Object) {
            out = {};
        } else if (lastShadow instanceof Function) {
            out = cloneFunction(lastShadow);
        }
        return out;
    };
    // 获取连续的数据
    const getShadowObjects = function (shadows) {
        const out = shadows.reduce(function (collector, shadow) {
            if (shadows instanceof Object) {
                collector.push(shadow);
            } else {
                collector = [];
            }
            return collector;
        }, []);
        return out;
    }

    function objectMergeRecursor(shadows, currentDepth) {
        currentDepth = options.depth != false ? (options.depth ? options.depth + 1 : 1) : 0;

        let out = getOutputObject(shadows);

        function shadowHandler(val, prop, shadows) {
            debugger
            if (out[prop]) {
                out[prop] = objectMergeRecursor([
                    out[prop],
                    shadows[prop]
                ], currentDepth);
            } else {
                out[prop] = objectMergeRecursor([shadows[prop]], currentDepth);
            }
        }

        function shadowMerger(shadow) {
            objectForeach(shadow, shadowHandler);
        }

        if (out instanceof Object) {
            const relevantShadows = getShadowObjects(shadows);
            relevantShadows.forEach(shadowMerger)
        }
        return out;
    }

    return objectMergeRecursor(shadows);
};

Function.prototype.bindArgs = function (scope) {
    const fn = this;
    return function () {
        return fn.apply(scope);
    }
}

Function.prototype._bind = function (oThis) {
    if (typeof this !== "function") {
        // closest thing possible to the ECMAScript 5 internal IsCallable function
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis ?
                this : oThis,
                aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
};

// const bar = function (opts) {
//     this.name = opts.name || false;
// };

// const newBar = bar._bind.apply(bar, [null, {
//     name: 9999
// }]);

// console.log(new newBar());

objectMerged.createOptions = createOptions;

export default objectMerged;