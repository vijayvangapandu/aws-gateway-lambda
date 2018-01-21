'use strict';

console.log('Loading function');

//const doc = require('dynamodb-doc');
//const dynamo = new doc.DynamoDB();


/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = (event, context, callback) => {

    var eventString = JSON.stringify(event, null, 2);
    //console.log('Received event:', eventString);

    var responseValue = {};
    var PhotoDataService = require('./src/service/PhotoDataService');
    var photoDataService = new PhotoDataService();
    switch (event.httpMethod) {
        case 'DELETE':
            //dynamo.deleteItem(JSON.parse(event.body), done);
            console.log('Deleted Item..');
            responseValue = generateGetResponse("Delete Successful...");
            break;
        case 'GET':
            //dynamo.scan({ TableName: event.queryStringParameters.TableName }, done);
            console.log('GET Item..');
            responseValue = generateGetResponse("Scan Successful...");
            break;
        case 'POST':
            //dynamo.putItem(JSON.parse(event.body), done);
            console.log('PUT Item..');
            responseValue = generateGetResponse("Post Successful...");
            break;
        case 'PUT':
            //dynamo.updateItem(JSON.parse(event.body), done);
            console.log('Update Item with body..');
            var body = event.body;
            console.log(body);
            photoDataService.createPhoto(body, generateGetResponse, generateGetResponse);
            responseValue = generateGetResponse("PUT Successful...");
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
    if(event.httpMethod && event.httpMethod == 'PUT') {
        console.log("PUT Method with body:", event.body);
    }
    // Help function to generate an IAM policy
    var responseString = '['+eventString  ;
    if(event.requestContext && event.requestContext.authorizer) {

        //console.log('authorizer PrincipalId:', event.requestContext.authorizer);
        var principalIdStr = event.requestContext.authorizer.principalId;
        console.log(`PrincipalId: ${principalIdStr}`);
        responseString = responseString + ',{principal: '+principalIdStr +'}]';
    }

    console.log('ResponseString: ', responseString);
    callback(null, generateGetResponse(responseString));
};

var generateGetResponse = function(eventString) {
    var responseBody = {
        "inputEvent": eventString,
    };

    var response = {
        "statusCode": 200,
        "headers": {
            "my_header": "ResponseFromPhotoGetAPI"
        },
        "body": JSON.stringify(responseBody),
        "isBase64Encoded": false
    };

    return response;
};