console.log('Starting...');

var sessionToken = require('./lib/sessionToken'),
    getMfaResponseSender = require('./lib/getMfaResponseSender'),
    getItemVerificationResponseSender = require('./lib/getItemVerificationResponseSender'),
    express = require('express'),
    routes = require('./routes/index'),
    bodyParser = require('body-parser'),
    port = process.argv[2] || process.env.PORT || 3003,
    app = express();

app.use(bodyParser());
app.use(function logBody(req, res, next) {
    console.log('REQUEST:\n' + JSON.stringify(req.body, null, " "));
    next();
});

app.use(function logResponseBody(req, res, next) {
  var oldWrite = res.write,
      oldEnd = res.end;
  var chunks = [];

  res.write = function (chunk) {
    chunks.push(chunk);

    oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk)
      chunks.push(chunk);

    var body = Buffer.concat(chunks).toString('utf8');
    console.log('RESPONSE:\n' + JSON.stringify(JSON.parse(body), null, 2));

    oldEnd.apply(res, arguments);
  };

  next();
});

app.use(function resContentTypeJson(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});
app.get('/', routes.health);
app.post('/authenticate/login', routes.login);
app.post('/authenticate/coblogin', routes.coblogin);
app.post('/jsonsdk/UserRegistration/register3', routes.register3);
app.post('/jsonsdk/RoutingNumberService/getContentServiceInfoByRoutingNumber', routes.getContentServiceInfoByRoutingNumber);
app.post('/jsonsdk/ContentServiceTraversal/getContentServiceInfo1', routes.getContentServiceInfo1);
app.post('/jsonsdk/ItemManagement/getLoginFormForContentService', routes.getLoginFormForContentService);
app.post('/jsonsdk/ExtendedInstantVerificationDataService/addItemAndStartVerificationDataRequest', routes.addItemAndStartVerificationDataRequest);
app.post('/jsonsdk/Refresh/getMFAResponse', routes.getMFAResponse);
app.post('/jsonsdk/Refresh/putMFARequest', routes.putMFARequest);
app.post('/jsonsdk/InstantVerificationDataService/getItemVerificationData', routes.getItemVerificationData);

app.listen(port);
console.log('Listening on port %d', port);