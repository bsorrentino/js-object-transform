
import {ITestGroup, Test} from  "nodeunit";

import * as transform from "js-object-transform";

exports['json-transform'] = {
    'source and config only': require('./source and config only'),
    'skipping': require('./skippingTests'),
    
};
