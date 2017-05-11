function transform(src, dest, config) {
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
                if (v === undefined)
                    break; // ignore attribute
                dest[key] = v;
                break;
            case 'string':
                transform.transforms["default"](src, dest, config[key], key);
                break;
        }
    });
    return dest;
}
//============================ Transforms
transform.transforms = {
    Namespace: function (src, dest, srcKey, destKey) {
        var v = transform.getNamespacedProperty(src, srcKey);
        if (v !== undefined)
            dest[destKey] = v;
    }
};
transform.transforms["default"] = transform.transforms.Namespace;
//============================ Utilities
transform.getNamespacedProperty = function getNamespacedProperty(obj, path) {
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
};
module.exports = transform;
