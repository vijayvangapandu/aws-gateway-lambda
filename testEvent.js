var event = {
    "authorizationToken": "Bearer 901df9a3-6b38-4a5a-a146-1532afaeda2a",
        //"methodArn": "arn:aws:execute-api:[region]:[account_id]:[restApiId]/[stage]/[method]/[resourcePath]",
        "methodArn": "arn:aws:execute-api:us-west-2:788346483045:thpfdcy0sl/qa/GET/PhotoDataSave",
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
    console.log(data.policyDocument.Statement);
});