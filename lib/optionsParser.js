var parseArgs = require('minimist');
var Scenario = require('../lib/scenario');

// See the readme file for documentation on these options
exports.parse = function(options) {

	var data = new Scenario();

	if (options.indexOf("-") < 0) {
		return data;
	}

	var args = parseArgs(options.split(' '));

	if (args['nomfa'])
		data.isMfa = false;

	if (args['mfatimeout'])
		data.mfaTimeout = true;

	if (args['mfafail'])
		data.mfaPass = false;

	if (args['mfatypes'])
		data.mfaTypes = parseMfaTypes(args['mfatypes']);

	if (args['r'] != null) {
		var refreshes = parseRefreshes(args['r']);
		data.refreshesSet = refreshes;
		data.refreshesLeft = refreshes;
	}

	if (args['e'])
		data.errorType = parseErrorOption(args['e']);

	if (args['fail'])
		data.errorType = 402; // Invalid login

	if (args['a'] != null)
		parseAccountsOption(data.accounts, args['a']);

	if (args['masked'])
		maskAccountNumbers(data.accounts);

	if (args['norouting'])
		removeRoutingNumbers(data.accounts);

	return data;
}

function parseMfaTypes(mfatypesOption) {

	if (mfatypesOption == "disabled")
		return null;

	if (typeof mfatypesOption == 'string' || mfatypesOption instanceof String)
		return mfatypesOption.split('');

	var mfaTypes = ['q'];
	return mfaTypes;
}

function parseRefreshes(rOption) {

	var refreshes = 1;

	if (rOption == 'timeout') {
		refreshes = -1;
	} else {

		var numRefreshes = Number(rOption);

		if (!isNaN(numRefreshes))
			return numRefreshes;
	}

	return refreshes;
}

function parseErrorOption(eOption) {

	var errorType = 0
	var errorTypeNum = Number(eOption);

	if (!isNaN(errorTypeNum))
		return errorTypeNum;

	switch (eOption) {
		case 'UnavailableSite':
			return 409;
		case 'VisitSite':
			return 406;
		case 'UnsupportedSite':
			return 505;
		case 'AlreadyLoggedIn':
			return 416;
		case 'AccountNotFound':
			return 423;
		case 'InvalidLogin':
			return 402;
		case 'UnsupportedSiteLanguage':
			return 421;
	}

	return errorType;
}

function parseAccountsOption(accounts, aOption) {

	var aOptionNum = Number(aOption);

	if (isNaN(aOptionNum))
		return;

	accounts.splice(aOptionNum, accounts.length - aOptionNum);
}

function maskAccountNumbers(accounts) {

	for (var i = 0, len = accounts.length; i < len; i++) {
		accounts[i].accountNumber = maskAccountNumber(accounts[i].accountNumber);
	}
}

function maskAccountNumber(accountNumber) {

	if (accountNumber.indexOf('*') > -1)
		return accountNumber;

	if (accountNumber.length > 4)
		return '****' + accountNumber.substr(4, accountNumber.length - 4);
	else
		return '****' + accountNumber;
}

function removeRoutingNumbers(accounts) {

	for (var i = 0, len = accounts.length; i < len; i++) {
		accounts[i].routingNumber = null;
	}
}