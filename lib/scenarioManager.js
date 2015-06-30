var NodeCache = require('node-cache');
var optionsParser = require('../lib/optionsParser');

var cache = new NodeCache({ stdTTL: 900, checkperiod: 300 });

exports.set = function(userSessionToken, options, contentServiceId) {

	var scenarioData = optionsParser.parse(options);
	scenarioData.contentServiceId = contentServiceId;

	cache.set(userSessionToken, scenarioData);

	return scenarioData;
};

exports.update = function(userSessionToken, scenarioData) {
	cache.set(userSessionToken, scenarioData);
}

exports.get = function(userSessionToken, next) {

	// This is supposed to work synchronously without a callback but it doesn't
	cache.get(userSessionToken, function(err, value) {

		var scenarioData = value[userSessionToken];

		if (!scenarioData) {
			scenarioData = optionsParser.parse('testuser');
			cache.set(userSessionToken, scenarioData);
		}

		next(scenarioData);
	});
}
