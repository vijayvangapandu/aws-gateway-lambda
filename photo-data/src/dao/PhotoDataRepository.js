'use strict';

var AWS = require("aws-sdk");

function PhotoDataRepository(config) {
    console.log("Loading PhotoDataRepository...", config);
    AWS.config.update({
        region: config.region,
        endpoint: config.endpoint
    });
    this.docClient = new AWS.DynamoDB.DocumentClient();
}

PhotoDataRepository.prototype.createPhoto = function(photoItemParams, successCallback, failureCallback) {

   this.docClient.put(photoItemParams, function(err, data) {
        if (err) {
            console.error("Unable to add photo", data, ". Error JSON:", JSON.stringify(err, null, 2));
            failureCallback(JSON.stringify(err, null, 2));
        } else {
            console.log("Succesfully created photo:", data);
            successCallback(photoItemParams.Item);
        }
    });
};

PhotoDataRepository.prototype.getPhotoById = function(userId, photoId, successCallback, failureCallback) {
    const params = {
        TableName: "PhotoData",
        Key:{
            "UserId": userId,
            "PhotoId": photoId
        }
    };
    this.docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to get photo with params:", params, ". Error JSON:", JSON.stringify(err, null, 2));
            failureCallback(JSON.stringify(err, null, 2));
        } else {
            console.log("Get successfull for params:", params);
            successCallback(JSON.stringify(data, null, 2));
        }
    });
};

PhotoDataRepository.prototype.getAllUserPhotos = function(userId, successCallback, failureCallback) {

    const params = {
        TableName : "PhotoData",
        KeyConditionExpression: "UserId = :userId",

        ExpressionAttributeValues: {
            ":userId":userId
        }
    };
    this.docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to Query photo with params:", params, ". Error JSON:", JSON.stringify(err, null, 2));
            failureCallback(JSON.stringify(err, null, 2));
        } else {
            console.log("Query successfull for params:", params);
            successCallback(JSON.stringify(data, null, 2));
        }
    });
};

PhotoDataRepository.prototype.getAllUserApprovedPhotos = function(userId, successCallback, failureCallback) {

    const pstatus = 2;
    const params = {
        TableName : "PhotoData",
        KeyConditionExpression: "UserId = :userId  ",
        FilterExpression: "#ps = :pstat",

        ExpressionAttributeNames:{
            "#ps": "Status"
        },
        ExpressionAttributeValues: {
            ":userId":userId,
            ":pstat":pstatus
        },
    };
    this.docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to Query photo with params:", params, ". Error JSON:", JSON.stringify(err, null, 2));
            failureCallback(JSON.stringify(err, null, 2));
        } else {
            console.log("Query successfull for params:", params);
            successCallback(JSON.stringify(data, null, 2));
        }
    });
};

PhotoDataRepository.prototype.updatePhotoStatus = function(userId, photoId, pstatus, successCallback, failureCallback) {
    const params = {
        TableName: "PhotoData",
        Key:{
            "UserId": userId,
            "PhotoId": photoId
        },
        UpdateExpression: "set #ps = :pstat",
        /*ExpressionAttributeValues:{
            ":pstat":pstatus
        },*/
        ExpressionAttributeNames:{
            "#ps": "Status"
        },
        ExpressionAttributeValues: {
            ":pstat":pstatus
        },
        ReturnValues:"UPDATED_NEW"
    };
    this.docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to UPDATE photo with params:", params, ". Error JSON:", JSON.stringify(err, null, 2));
            failureCallback(JSON.stringify(err, null, 2));
        } else {
            console.log("UPDATE successfull for params:", params);
            successCallback(JSON.stringify(data, null, 2));
        }
    });
};

PhotoDataRepository.prototype.deletePhotoById = function(userId, photoId, successCallback, failureCallback) {
    const params = {
        TableName: "PhotoData",
        Key:{
            "UserId": userId,
            "PhotoId": photoId
        }
        /*ConditionExpression:"status = :status",
        ExpressionAttributeValues: {
            ":status": 3
        }*/
    };
    this.docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to DELETE photo with params:", params, ". Error JSON:", JSON.stringify(err, null, 2));
            failureCallback(JSON.stringify(err, null, 2));
        } else {
            console.log("DELETE successfull for params:", params);
            successCallback(JSON.stringify(data, null, 2));
        }
    });
};


module.exports = PhotoDataRepository;