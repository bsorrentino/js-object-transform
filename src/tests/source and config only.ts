import {ITestGroup, Test} from  "nodeunit";

import {toString} from "./helpers";

const DEBUG = !!process.env.DEBUG;

export var testGroup:ITestGroup = { 

    setUp: (callback) => {
        var transform = this.transform = require('../index');

        this.source = {
            test: true,
            num: 1,
            string: "Yes",
            firstname: 'Chris',
            age: 23,
            someObject: {
                someValue: 42
            }
        };
        this.configuration = {
            'test2' : 'test',
            'one': 'num',
            'affirmative': 'string',
            'message': function(src, dest, key) {
                return src.string + " " + src.firstname;
            },
            'theAnswer': 'someObject.someValue'
        };
        this.destination = transform(this.source, this.configuration);

        callback();

        
    },
    tearDown: (callback) => {
        DEBUG && console.log('');
        DEBUG && console.log("%s", toString({
            source: this.source,
            destination: this.destination,
            configuration: this.configuration
        }));

        callback();
    },
    'can create a new object from a source and config': (test:Test) => {
        test.expect(1);

        test.ok(typeof this.destination === 'object', 'dest generated');
        test.done();
    },
    'can copy the appropriate values straight over from the source':(test:Test) => {
        test.expect(3);

        test.strictEqual(this.destination.test2, this.source.test);
        test.strictEqual(this.destination.one, this.source.num);
        test.strictEqual(this.destination.affirmative, this.source.string);
        test.done();
    },
    'can generate the appropriate values via callback over from the source':(test:Test) => {
        test.expect(1);

        test.strictEqual(this.destination.message, 'Yes Chris');
        test.done();
    },
    'can find and copy a value using a namepath':(test:Test) => {
        test.expect(1);

        test.strictEqual(this.destination.theAnswer, 42);
        test.done();
    }
};
