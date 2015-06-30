var scenarioManager = require('../lib/scenarioManager');

function get(res, scenarioData, status, code) {

    var jsonResponse =
        '[{ \
            "itemVerificationInfo": { \
                "transactionId": "AEGNZDEQ94", \
                "itemId": 724985, \
                "contentServiceId": ' + scenarioData.contentServiceId + ', \
                "requestStatus": { \
                    "verificationRequestStatus": "' + status + '" \
                }, \
                "requestType": { \
                    "name": "IAV_FAST" \
                }, \
                "requestTime": "2013-11-18T18:20:10+0530", \
                "completionTime": "2013-11-18T18:20:51+0530", \
                "intRespCompletionTime": "2013-11-18T18:20:26+0530", \
                "completed": false, \
                "statusCode": ' + code + ', \
                "requestedLocale": "en_US", \
                "derivedLocale": "en_US" \
            }, \
            "accountVerificationData": [';

    var serializedAccounts = [];
    for (i = 0; i < scenarioData.accounts.length; i++) {
    	serializedAccounts.push(buildAccountJson(scenarioData.accounts[i], status, code, scenarioData.contentServiceId));
    }

    jsonResponse += serializedAccounts.join(',');
    jsonResponse +=
            ' ] \
        }]';

    res.send(jsonResponse);
}

module.exports.get = get;

function buildAccountJson(account, status, code, contentServiceId) {

    var accountJson =
      ' { \
          "accountType": { \
              "name": "' + account.accountType + '" \
          }, \
          "availableBalance": { \
              "amount": ' + account.balance + ', \
              "currencyCode": "USD" \
          }, \
          ' + buildRoutingNumber(account.routingNumber) + '\
          "itemVerificationInfo": { \
              "transactionId": "AEGNZDEQ94", \
              "itemId": 724985, \
              "contentServiceId": ' + contentServiceId + ', \
              "requestStatus": { \
                  "verificationRequestStatus": "' + status + '" \
              }, \
              "requestType": { \
                  "name": "IAV_FAST" \
              }, \
              "requestTime": "2013-11-18T18:20:10+0530", \
              "completionTime": "2013-11-18T18:20:51+0530", \
              "intRespCompletionTime": "2013-11-18T18:20:26+0530", \
              "completed": false, \
              "statusCode": ' + code + ', \
              "requestedLocale": "en_US", \
              "derivedLocale": "en_US" \
          }, \
          "accountNumber": "' + account.accountNumber + '", \
          "accountName": "' + account.accountName + '", \
          "accountHolder": { \
              "fullName": "' + account.accountHolder + '" \
          } \
      }';
      return accountJson;
}

function buildRoutingNumber(routingNumber) {

    if (!routingNumber) {
        return '';
    } else {
        return '"routingNumber":"' + routingNumber + '",';
    }
}