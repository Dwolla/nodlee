var scenarioManager = require('../lib/scenarioManager');

module.exports = function(req, res) {

  scenarioManager.get(req.body.userSessionToken, function(scenarioData) {

      if (scenarioData.mfaTimeout) {
          res.send(
          '{ \
            "primitiveObj": false \
           }');
      } else {
         res.send(
          '{ \
            "primitiveObj": true \
           }');
      }
  });
};
