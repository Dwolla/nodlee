var sessionToken = require('../lib/sessionToken');

module.exports = function(req, res) {
    res.send(
    '{ \
        "userContext": { \
            "conversationCredentials": { \
                "sessionToken": "' + sessionToken.nextUserToken() + '" \
            }, \
            "valid": true, \
            "isPasswordExpired": false, \
            "cobrandId": 10008392, \
            "channelId": -1, \
            "locale": "en_US", \
            "tncVersion": 2, \
            "applicationId": "7A318B9CD555B6A3FF82D22CBF3C9F00", \
            "cobrandConversationCredentials": { \
                "sessionToken": "' + sessionToken.getCobrandToken() + '" \
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
        "lastLoginTime": 1392838986, \
        "loginCount": 4, \
        "passwordRecovered": false, \
        "emailAddress": "dirk@ronk.com", \
        "loginName": "DirkRonk", \
        "userId": 15025128, \
        "userType": { \
            "userTypeId": 1, \
            "userTypeName": "normal_user" \
        }, \
        "isConfirmed": false \
    }');
};