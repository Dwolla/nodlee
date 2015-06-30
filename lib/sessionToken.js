var prefix = "10122012_0:";
var cobrandToken = nextCobrandToken();
var userToken = nextUserToken();

function getCobrandToken() {
    return cobrandToken;
}

function getUserToken() {
    return userToken;
}

function nextCobrandToken() {
    cobrandToken = prefix + makeid();
    return cobrandToken;
}

function nextUserToken() {
    userToken = prefix + makeid();
    return userToken;
}

function makeid() {
    var text = "";
    var possible = "abcdefg0123456789";

    for( var i=0; i < 128; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports.getCobrandToken = getCobrandToken;
module.exports.getUserToken = getUserToken;
module.exports.nextCobrandToken = nextCobrandToken;
module.exports.nextUserToken = nextUserToken;
