var event = {
    "authorizationToken": "901df9a3-6b38-4a5a-a146-1532afaeda2a",
        "methodArn": "arn:aws:execute-api:[region]:[account_id]:[restApiId]/[stage]/[method]/[resourcePath]",
        "type": "TOKEN"
};

process.env.ENVIRONMENT = "dev";
var authHandler = require("./src/authHandlers");

authHandler['handler'] (event, {
    'succeed': function (data) {
        console.log(JSON.stringify(data, null, 2));
    },
    'fail': function (error) {
        console.log(error);
    }
}, function(status, data) {
    console.log(data);
});