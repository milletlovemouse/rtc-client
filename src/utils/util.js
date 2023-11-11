export function debounce(fn, delay, immediate) {
    if (immediate === void 0) { immediate = false; }
    var isInvoke = false;
    var timer = null;
    var _debounce = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            if (immediate && !isInvoke) {
                try {
                    var result = fn.apply(_this, args);
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
                isInvoke = true;
            }
            else {
                timer && clearTimeout(timer);
                timer = setTimeout(function () {
                    try {
                        var result = fn.apply(_this, args);
                        resolve(result);
                    }
                    catch (error) {
                        reject(error);
                    }
                    isInvoke = false;
                }, delay);
            }
        });
    };
    _debounce.cancel = function () {
        if (timer)
            clearTimeout(timer);
        timer = null;
        isInvoke = false;
    };
    return _debounce;
}
export function throttle(fn, interval, options) {
    if (options === void 0) { options = {
        leading: true,
        trailing: false,
    }; }
    var leading = options.leading, trailing = options.trailing;
    var lastTime = 0;
    var timer = null;
    var _throttle = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            var nowTime = new Date().getTime();
            if (!lastTime && !leading)
                lastTime = nowTime;
            var remainTime = interval - (nowTime - lastTime);
            if (remainTime <= 0) {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                try {
                    var result = fn.apply(_this, args);
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
                lastTime = nowTime;
                return;
            }
            else if (trailing && !timer) {
                timer = setTimeout(function () {
                    try {
                        var result = fn.apply(_this, args);
                        resolve(result);
                    }
                    catch (error) {
                        reject(error);
                    }
                    lastTime = !leading ? 0 : new Date().getTime();
                    timer = null;
                }, remainTime);
            }
        });
    };
    _throttle.cancel = function () {
        if (timer)
            clearTimeout(timer);
        timer = null;
        lastTime = 0;
    };
    return _throttle;
}
export var isBoolean = function (data) { return typeof data === 'boolean'; };
export var isNumber = function (data) { return typeof data === 'number'; };
export var isString = function (data) { return typeof data === 'string'; };
export var isFunction = function (data) { return typeof data === 'function'; };
export var isArray = function (data) { return Array.isArray(data); };
export var isType = function (data, type) { return toString.call(data) === "[object ".concat(type, "]"); };
export var isObject = function (data) { return isType(data, 'Object'); };
