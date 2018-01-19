var event = {
    "body": "{\"test\":\"body\"}",
    "resource": "/{proxy+}",
    "requestContext": {
        "resourceId": "123456",
        "apiId": "1234567890",
        "authorizer": {
            "principalId": "user|a1b2c3d4"
        },
        "resourcePath": "/{proxy+}",
        "httpMethod": "POST",
        "requestId": "c6af9ac6-7b61-11e6-9a41-93e8deadbeef",
        "accountId": "123456789012",
        "identity": {
            "apiKey": null,
            "userArn": null,
            "cognitoAuthenticationType": null,
            "caller": null,
            "userAgent": "Custom User Agent String",
            "user": null,
            "cognitoIdentityPoolId": null,
            "cognitoIdentityId": null,
            "cognitoAuthenticationProvider": null,
            "sourceIp": "127.0.0.1",
            "accountId": null
        },
        "stage": "prod"
    },
    "queryStringParameters": {
        "foo": "bar"
    },
    "headers": {
        "Via": "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)",
        "Accept-Language": "en-US,en;q=0.8",
        "CloudFront-Is-Desktop-Viewer": "true",
        "CloudFront-Is-SmartTV-Viewer": "false",
        "CloudFront-Is-Mobile-Viewer": "false",
        "X-Forwarded-For": "127.0.0.1, 127.0.0.2",
        "CloudFront-Viewer-Country": "US",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Upgrade-Insecure-Requests": "1",
        "X-Forwarded-Port": "443",
        "Host": "1234567890.execute-api.us-east-1.amazonaws.com",
        "X-Forwarded-Proto": "https",
        "X-Amz-Cf-Id": "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA==",
        "CloudFront-Is-Tablet-Viewer": "false",
        "Cache-Control": "max-age=0",
        "User-Agent": "Custom User Agent String",
        "CloudFront-Forwarded-Proto": "https",
        "Accept-Encoding": "gzip, deflate, sdch"
    },
    "pathParameters": {
        "proxy": "path/to/resource"
    },
    "httpMethod": "POST",
    "stageVariables": {
        "baz": "qux"
    },
    "path": "/path/to/resource"
};

process.env.ENVIRONMENT = "dev";
var photoDataHandler = require("./src/photoDataGetHandler");

photoDataHandler['handler'] (event, {
    'succeed': function (data) {
        console.log(JSON.stringify(data, null, 2));
    },
    'fail': function (error) {
        console.log(error);
    }
}, function(status, data) {
    console.log(data);

});