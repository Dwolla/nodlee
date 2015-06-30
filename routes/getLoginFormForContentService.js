var sessionToken = require('../lib/sessionToken'),
    path = require('path');

module.exports = function(req, res) {
    var contentServiceId = req.body["contentServiceId"];
    fs = require('fs');

    fs.readFile(__dirname + '/loginInfo/' + contentServiceId + '.parsed', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        clean = data.replace(/\s+(?=([^"]*"[^"]*")*[^"]*$)/g, "");
        console.log(clean);
        res.send(clean);
    });
};