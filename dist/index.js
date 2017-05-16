"use strict";
var transform;
(function (transform) {
    function getNamespacedProperty(obj, path) {
        var retVal = obj;
        var paths = path.split('.');
        for (var i = 0; i < paths.length; ++i) {
            if (retVal && paths[i] in retVal) {
                retVal = retVal[paths[i]];
            }
            else {
                retVal = undefined;
                break;
            }
        }
        return retVal;
    }
    ;
    function apply(src, dest, config) {
        switch (arguments.length) {
            case 1:
                return {};
            case 2:
                config = dest;
                dest = {};
                break;
            default:
                break;
        }
        dest = dest || {};
        config = config || {};
        if (typeof src === 'string') {
            try {
                src = JSON.parse(src);
            }
            catch (ex) {
                return null;
            }
        }
        Object.keys(config).forEach(function (key) {
            switch (typeof config[key]) {
                case 'function':
                    var v = config[key](src, dest, key);
                    if (v !== undefined)
                        dest[key] = v;
                    break;
                case 'string':
                    var v = getNamespacedProperty(src, config[key]);
                    if (v !== undefined)
                        dest[key] = v;
                    break;
            }
        });
        return dest;
    }
    transform.apply = apply;
})(transform || (transform = {}));
module.exports = transform.apply;
