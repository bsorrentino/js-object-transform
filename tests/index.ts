
import {ITestGroup, Test} from  "nodeunit";


exports['json-transform'] = {
    'source and config only': require('./source and config only'),
    'skipping': require('./skippingTests'),
    
};
