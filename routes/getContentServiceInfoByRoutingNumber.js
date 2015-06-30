var sessionToken = require('../lib/sessionToken');
var info = require('../lib/contentServiceInfo');

module.exports = function(req, res) {
    res.send(
        '{ \
        "contentServiceId": ' + info.contentServiceId + ', \
        "contentServiceDisplayName": "' + info.contentServiceDisplayName + '", \
        "organizationDisplayName": "' + info.organizationDisplayName + '", \
        "siteDisplayName": "' + info.siteDisplayName + '", \
        "homeUrl": "http://www.wellsfargo.com/", \
        "isIAVFastSupported": ' + info.isIAVFastSupported + ', \
        "mfaType": { \
            "typeId": 4, \
            "typeName": "NONE" \
        }, \
        "mfaCoverage": "FMPA", \
        "defaultHelpText": "616" \
    }');
};