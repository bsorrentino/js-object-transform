"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
var DEBUG = !!process.env.DEBUG;
exports.testGroup = {
    setUp: function (callback) {
        var transform = _this.transform = require('../index');
        _this.source = {
            test: true,
            num: 1,
            string: "Yes",
            firstname: 'Chris',
            age: 23,
            someObject: {
                someValue: 42
            }
        };
        _this.configuration = {
            'test2': 'test',
            'one': 'num',
            'affirmative': 'string',
            'message': function (src, dest, key) {
                return src.string + " " + src.firstname;
            },
            'theAnswer': 'someObject.someValue'
        };
        _this.destination = transform(_this.source, _this.configuration);
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
    'can create a new object from a source and config': function (test) {
        test.expect(1);
        test.ok(typeof _this.destination === 'object', 'dest generated');
        test.done();
    },
    'can copy the appropriate values straight over from the source': function (test) {
        test.expect(3);
        test.strictEqual(_this.destination.test2, _this.source.test);
        test.strictEqual(_this.destination.one, _this.source.num);
        test.strictEqual(_this.destination.affirmative, _this.source.string);
        test.done();
    },
    'can generate the appropriate values via callback over from the source': function (test) {
        test.expect(1);
        test.strictEqual(_this.destination.message, 'Yes Chris');
        test.done();
    },
    'can find and copy a value using a namepath': function (test) {
        test.expect(1);
        test.strictEqual(_this.destination.theAnswer, 42);
        test.done();
    }
};
