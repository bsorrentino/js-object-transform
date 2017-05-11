"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
var DEBUG = !!process.env.DEBUG;
exports.testGroup = {
    setUp: function (callback) {
        var transform = _this.transform = require('../index');
        _this.configuration = [{
                "attribute": function (src, dest) {
                    if (src.email === undefined)
                        return;
                    return [{
                            "type": "emailAddress",
                            "value": src.email
                        }];
                },
                "mobile": "mobile"
            }
        ];
        _this.source = new Array({ email: "test@mail.com", mobile: "5555555555" }, { email: "test@mail.com", mobile: undefined }, { email: "test@mail.com" }, { email: "test@mail.com", mobile: null });
        _this.destination = new Array(transform(_this.source[0], _this.configuration[0]), transform(_this.source[1], _this.configuration[0]), transform(_this.source[2], _this.configuration[0]), transform(_this.source[3], _this.configuration[0]));
        callback();
    },
    tearDown: function (callback) {
        DEBUG && console.log('');
        DEBUG && console.log("%s", helpers_1.toString({
            source: _this.source,
            destination: _this.destination,
            configuration: _this.configuration
        }));
        callback();
    },
    'verify destination[0] data': function (test) {
        test.expect(2);
        var source = _this.source[0];
        var dest = _this.destination[0];
        test.ok(Array.isArray(dest.attribute));
        test.strictEqual(dest.mobile, source.mobile);
        test.done();
    },
    'verify destination[1] skipping undefined from dest': function (test) {
        test.expect(3);
        var dest = _this.destination[1];
        console.dir(dest);
        test.ok(Array.isArray(dest.attribute));
        test.ok(dest.mobile === undefined, "dest.mobile is present!");
        test.ok(!("mobile" in dest), "property mobile is present");
        test.done();
    },
    'verify destination[2] skipping not present in dest': function (test) {
        test.expect(3);
        var dest = _this.destination[2];
        test.ok(Array.isArray(dest.attribute));
        test.ok(dest.mobile === undefined, "dest.mobile is present!");
        test.ok(!("mobile" in dest), "property mobile is present");
        console.dir(dest);
        test.done();
    },
    'verify destination[3] not skip if dest is null': function (test) {
        test.expect(4);
        var dest = _this.destination[3];
        test.ok(Array.isArray(dest.attribute));
        test.ok(dest.mobile !== undefined, "dest.mobile is undefined!");
        test.ok(dest.mobile === null, "dest.mobile is not null!");
        test.ok(("mobile" in dest), "property mobile is not present");
        console.dir(dest);
        test.done();
    }
};
