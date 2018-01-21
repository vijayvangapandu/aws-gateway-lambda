'use strict';

var AWS = require("aws-sdk");


AWS.config.update({
    region: "us-west-2",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();



function PhotoDataRepository() {
    console.log("Loading photos data");
}

PhotoDataRepository.prototype.createPhoto = function(photoItemParams, successCallback, failureCallback) {

   docClient.put(photoItemParams, function(err, data) {
        if (err) {
            console.error("Unable to add photo", data, ". Error JSON:", JSON.stringify(err, null, 2));
            failureCallback(JSON.stringify(err, null, 2));
        } else {
            console.log("Succesfully created photo:", data);
            successCallback(data);
        }
    });
};
module.exports = PhotoDataRepository;