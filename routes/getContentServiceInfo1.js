var sessionToken = require('../lib/sessionToken');

module.exports = function(req, res) {
    // Various errors we've seen returned from Yodlee
    if (false) {
        res.send('<?xml version="1.0" encoding="UTF-8" standalone="yes"?> \
           <Errors xmlns="http://namespace.yodlee.com/pfm/2009/Error"> \
               <Error> \
                       <errorDetail>Token authentication failed for cobrand/user Invalid conversation credentials</errorDetail> \
               </Error> \
           </Errors>');
    } else if (false) {
        res.send('{ \
           "errorOccurred": "true", \
           "exceptionType": "com.yodlee.core.ContentServiceNotFoundException", \
           "referenceCode": "_6c31a34f-aa51-4d2b-ae40-800679dfad14", \
           "message": "Argument value not found: -1" \
           }');
    } else if (false) {
        res.send(
            '{ \
            "Error": [ \
              { \
                "errorDetail": "Invalid cobrand conversation credentials" \
              } \
            ] \
            }');
    } else if (false) {
      res.send('{ \
                "errorDetail":"Token authentication failed for cobrand/user Invalid conversation credentials" \
              }');
    } else if (false) {
        res.send('<3 much error> wow response <3');
    //Invalid JSON response
    } else if (false) {
        res.setHeader('content-encoding', 'gzip');
        res.send('{ \
              "errorDetail":"Token authentication failed for cobrand/user Invalid conversation credentials" \
            }');
    //XML error response
    } else if (false) {
        res.setHeader('content-type', 'text/xml');
        res.send('{ \
              "errorDetail":"Token authentication failed for cobrand/user Invalid conversation credentials" \
            }');
    } else {
        var contentServiceId = req.body["contentServiceId"];
        fs = require('fs');

        fs.readFile(__dirname + '/contentInfo/' + contentServiceId + '.json', 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            clean = data.replace(/\s+(?=([^"]*"[^"]*")*[^"]*$)/g, "");
            console.log(clean);
            res.send(clean);
        });
    }
};