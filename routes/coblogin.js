var sessionToken = require('../lib/sessionToken');

module.exports = function(req, res) {
    res.send(
        '{ \
	    "cobrandId": 10008392, \
	    "channelId": -1, \
	    "locale": "en_US", \
	    "tncVersion": 2, \
	    "applicationId": "7A318B9CD555B6A3FF82D22CBF3C9F00", \
	    "cobrandConversationCredentials": { \
	        "sessionToken": "' + sessionToken.nextCobrandToken() + '" \
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
	}');
};
