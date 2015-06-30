var sessionToken = require('../lib/sessionToken');

module.exports = function(req, res) {
    res.send(
        '{ \
            "userContext": { \
                "conversationCredentials": { \
                    "sessionToken": "10122012_0:c23541e6ef6eb72995261a9c4bff26daf277255dbe6d2c23b954d4c65b1512f60fa63e8532e4f2173d94e5770fce1c4459c5abc3597fbe947bfa18ef12fc62e4" \
                }, \
                "valid": true, \
                "isPasswordExpired": false, \
                "cobrandId": 10008392, \
                "channelId": -1, \
                "locale": "en_US", \
                "tncVersion": 2, \
                "applicationId": "7A318B9CD555B6A3FF82D22CBF3C9F00", \
                "cobrandConversationCredentials": { \
                    "sessionToken": "10122012_0:5eeb85b2c07a089599ad789209504d1c0b17ef02666a1f97bf694ee5fb29ef67c2061f9547e4dcf7ef399c3998389d3060afb5f3a44903442ebddbf7a5c71cab" \
                }, \
                "preferenceInfo": { \
                    "currencyCode": "USD", \
                    "timeZone": "PST", \
                    "dateFormat": "MM/dd/yyyy", \
                    "currencyNotationType": { \
                        "currencyNotationType": "SYMBOL" \
                    }, \
                    "numberFormat": { \
                        "decimalSeparator": ".", \
                        "groupingSeparator": ",", \
                        "groupPattern": "###,##0.##" \
                    } \
                } \
            }, \
        "lastLoginTime": 1393260934, \
        "loginCount": 0, \
        "passwordRecovered": false, \
        "emailAddress": "dirk@ronk.com", \
        "loginName": "DirkRonk", \
        "userId": 15025184, \
        "isConfirmed": false \
    }');
};