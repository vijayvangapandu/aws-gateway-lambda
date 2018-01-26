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
    const [userId, locale, userStatus] = principalIdStr.split('|');
   // var responseValue = {};

    function successSaveCallback(data) {
        console.log("Call successful and response is: ", data);
        //responseValue = data;
        callback(null, generateGetResponse(data));
    }
    function failureSaveCallback(error) {
        console.log("Failed to save photo Item, with error: ", error);
        throw error;
    }

    switch (event.httpMethod) {
        case 'DELETE':
            //dynamo.deleteItem(JSON.parse(event.body), done);
            console.log('Deleted Item..');
            //responseValue = generateGetResponse("Delete Successful...");
            callback(null, generateGetResponse("Delete Successful..."));
            break;
        case 'GET':
            //dynamo.scan({ TableName: event.queryStringParameters.TableName }, done);
            if(event.pathParameters && event.pathParameters.photoId) {
                const photoId = event.pathParameters.photoId;
                photoDataService.getPhotoById(userId, photoId, successSaveCallback, failureSaveCallback);
            } else {
                photoDataService.getAllUserPhotos(userId, successSaveCallback, failureSaveCallback);
            }
            console.log('GET Item..');
            //responseValue = generateGetResponse("Scan Successful...");
            //callback(null, generateGetResponse(responseValue));
            break;
        case 'POST':
            console.log("Creating Item with body..", event.body);
            photoDataService.createPhoto(event.body, successSaveCallback, failureSaveCallback);
            //callback(null, generateGetResponse(responseValue));
            break;
        case 'PUT':
            console.log("Updating Item with body..", event.body);
            photoDataService.createPhoto(event.body, successSaveCallback, failureSaveCallback);
            //callback(null, generateGetResponse(responseValue));
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
            failureSaveCallback(new Error(`Unsupported method "${event.httpMethod}"`));
    }

};

var generateGetResponse = function(responseValue) {
    //console.log("Response data:", responseValue);
    var responseBody = {
        "response": responseValue,
    };

    var response = {
        "statusCode": 200,
        "headers": {
            "my_header": "ResponseFromPhotoGetAPI"
        },
        "body": JSON.stringify(responseBody),
        //"body": responseBody,
        "isBase64Encoded": false
    };

    return response;
};