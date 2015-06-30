var scenarioManager = require('../lib/scenarioManager');

module.exports = function(req, res) {

    var scenarioData = scenarioManager.set(
        req.body.userSessionToken, 
        req.body.credentialFields['0].valu'],
        req.body.contentServiceId);

    if (!scenarioData.isMfa) { // Non-MFA
        res.send(
            '{ \
              "refreshStatus": { \
                  "status": 4 \
              }, \
              "itemId": 14616772 \
          }');
    } else { // MFA
        res.send(
            '{ \
              "refreshStatus": { \
                  "status": 8 \
              }, \
              "itemId": 14616772 \
          }');
    }
};