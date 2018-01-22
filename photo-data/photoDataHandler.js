'use strict';

console.log('Loading photoDataHandler...');

const environment = process.env.ENVIRONMENT;

var evnResolved = 'dev';
if(environment) {
    evnResolved = environment;
}
const config = require('./src/config/' + evnResolved + '-config.json');
const PhotoDataService = require('./src/service/PhotoDataService');
const photoDataService = new PhotoDataService(config);

exports.handler = (event, context, callback) => {

    var eventString = JSON.stringify(event, null, 2);
    var principalIdStr = event.requestContext.authorizer.principalId;
    var responseValue = {};

    function successSaveCallback(data) {
        console.log("Created photo Item: ", data);
        responseValue = data;
    }
    function failureSaveCallback(error) {
        console.log("Failed to save photo Item, with error: ", error);
        throw error;
    }

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
            console.log("Creating Item with body..", event.body);
            photoDataService.createPhoto(event.body, successSaveCallback, failureSaveCallback);
            break;
        case 'PUT':
            console.log("Updating Item with body..", event.body);
            photoDataService.createPhoto(event.body, successSaveCallback, failureSaveCallback);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }

    callback(null, generateGetResponse(responseValue));
};

var generateGetResponse = function(responseValue) {
    console.log("Response data:", responseValue);
    var responseBody = {
        "response": responseValue,
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