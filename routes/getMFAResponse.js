var scenarioManager = require('../lib/scenarioManager');
var getMfaResponseSender = require('../lib/getMfaResponseSender');

module.exports = function(req, res) {

    scenarioManager.get(req.body.userSessionToken, function(scenarioData) {

        if (!scenarioData.mfaTypes) {

            getMfaResponseSender.noQuestions(res);

        } else if (scenarioData.mfaTypes.length < 1) {

            if (scenarioData.mfaPass) {
                getMfaResponseSender.success(res);
            } else {
                getMfaResponseSender.failure(res);
            }

        } else {

            var nextQuestion = scenarioData.mfaTypes[0];
            updateRemainingQuestions(scenarioData, req)

            switch(nextQuestion) {
                case 't':
                    getMfaResponseSender.token(res);
                    break;
                case 'i':
                    getMfaResponseSender.image(res);
                    break;
                default:
                    getMfaResponseSender.questions(res);
            }
        }
    });
};

function updateRemainingQuestions(scenarioData, req) {

    scenarioData.mfaTypes.splice(0, 1);
    scenarioManager.update(req.body.userSessionToken, scenarioData);
}