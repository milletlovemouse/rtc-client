var CustomEventTarget = /** @class */ (function () {
    function CustomEventTarget(target) {
        this.eventMap = new Map();
        this.target = target;
    }
    CustomEventTarget.prototype.on = function (eventName, callback) {
        this.target.addEventListener(eventName, callback);
        if (this.eventMap.has(eventName)) {
            this.eventMap.get(eventName).add(callback);
        }
        else {
            this.eventMap.set(eventName, new Set([callback]));
        }
    };
    CustomEventTarget.prototype.off = function (eventName, callback) {
        var _this = this;
        if (!callback && this.eventMap.has(eventName)) {
            this.eventMap
                .get(eventName)
                .forEach(function (callback) { return _this.target.removeEventListener(eventName, callback); });
            this.eventMap.get(eventName).clear();
        }
        this.target.removeEventListener(eventName, callback);
        if (this.eventMap.has(eventName)) {
            this.eventMap.get(eventName).delete(callback);
        }
    };
    CustomEventTarget.prototype.offAll = function () {
        var _this = this;
        this.eventMap.forEach(function (value, key) {
            _this.off(key);
        });
    };
    CustomEventTarget.prototype.close = function () {
        this.offAll();
        this.target = null;
    };
    return CustomEventTarget;
}());
export default CustomEventTarget;
