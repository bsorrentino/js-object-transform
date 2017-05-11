/// <reference path="../index.d.ts" />

import {ITestGroup, Test} from  "nodeunit";
import {toString} from "./helpers";

const DEBUG = !!process.env.DEBUG;

type Source = { email:string, mobile?:string };
type Dest = { attribute:[any], mobile?:string };

export var testGroup:ITestGroup = { 

    setUp: (callback) => {
        var transform:transform<Source,Dest> = this.transform = require('../index');

        this.configuration = [ {
            "attribute":( src, dest ) => {
                if( src.email === undefined ) return;

                return [{
                    "type": "emailAddress",
                    "value": src.email
                    }]
                },
                "mobile":"mobile"
            }
        ];

        this.source = new Array<Source>(
            { email: "test@mail.com", mobile: "5555555555"},
            { email: "test@mail.com", mobile: undefined },
            { email: "test@mail.com" },
            { email: "test@mail.com", mobile: null }
        );

        this.destination = new Array<Dest>( 
            transform(this.source[0], this.configuration[0]), 
            transform(this.source[1], this.configuration[0]), 
            transform(this.source[2], this.configuration[0]),
            transform(this.source[3], this.configuration[0]), 
        );

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
    'verify destination[0] data':(test:Test) => {
        test.expect(2);

        let source:Source = this.source[0];
        let dest:Dest = this.destination[0];

        test.ok( Array.isArray(dest.attribute) );
        test.strictEqual(dest.mobile, source.mobile);
        test.done();
    },
    'verify destination[1] skipping undefined from dest':(test:Test) => {
        test.expect(3);

        let dest:Dest = this.destination[1];

        console.dir(dest);

        test.ok( Array.isArray(dest.attribute) );
        test.ok( dest.mobile === undefined, "dest.mobile is present!");
        test.ok( !("mobile" in dest), "property mobile is present" );
        test.done();
    },
    'verify destination[2] skipping not present in dest':(test:Test) => {
        test.expect(3);

        let dest:Dest = this.destination[2];

        test.ok( Array.isArray(dest.attribute) );
        test.ok( dest.mobile === undefined, "dest.mobile is present!");
        test.ok( !("mobile" in dest), "property mobile is present" );

        console.dir(dest);

        test.done();
    },
    'verify destination[3] not skip if dest is null':(test:Test) => {
        test.expect(4);

        let dest:Dest = this.destination[3];

        test.ok( Array.isArray(dest.attribute) );
        test.ok( dest.mobile !== undefined, "dest.mobile is undefined!");
        test.ok( dest.mobile === null, "dest.mobile is not null!");
        test.ok( ("mobile" in dest), "property mobile is not present" );

        console.dir(dest);

        test.done();
    }
};
