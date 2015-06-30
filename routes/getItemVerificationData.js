var scenarioManager = require('../lib/scenarioManager');
var getItemVerificationResponseSender = require('../lib/getItemVerificationResponseSender');

module.exports = function(req, res) {

    scenarioManager.get(req.body.userSessionToken, function(scenarioData) {

        if (scenarioData.isMfa && !scenarioData.mfaPass) {

            sendErrorAndReset(520, scenarioData, req, res);

        } else if (scenarioData.refreshesLeft > 0 || scenarioData.refreshesLeft < 0) {

            scenarioData.refreshesLeft--;
            scenarioManager.update(req.body.userSessionToken, scenarioData);

            getItemVerificationResponseSender.get(res, scenarioData, 'IN_PROGRESS', 801);

        } else {

            if (scenarioData.errorType == 0) {
                getItemVerificationResponseSender.get(res, scenarioData, 'SUCCEEDED', 0);
            } else {
                sendErrorAndReset(scenarioData.errorType, scenarioData, req, res)
            }
        }
    });
};

function sendErrorAndReset(errorType, scenarioData, req, res) {

    scenarioData.refreshesLeft = scenarioData.refreshesSet;
    scenarioManager.update(req.body.userSessionToken, scenarioData);

    getItemVerificationResponseSender.get(res, scenarioData, 'LOGIN_FAILURE', errorType);
}
