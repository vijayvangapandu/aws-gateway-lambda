'use strict';

function successCallback(data) {
    console.log("Created photo Item: ", data);
}
function failureCallback(error) {
    console.log("Failed to save photo Item, with error: ", error);
}
function PhotoDataService() {
    console.log("loading PhotoDataService...");
}

PhotoDataService.prototype.createPhoto = function(photoItem, successCallback, failureCallback) {
    var params = {
        TableName: "PhotoData",
        Item: photoItem
    };
    var PhotoDataRepository = require("../dao/PhotoDataRepository");
    var photoDataRepository = new PhotoDataRepository();
    photoDataRepository.createPhoto(params, successSaveCallback, failureSaveCallback);
    function successSaveCallback(data) {
        console.log("Created photo Item: ", data);
        successCallback(data);
    }
    function failureSaveCallback(error) {
        console.log("Failed to save photo Item, with error: ", error);
        failureCallback(error);
    }
};

module.exports = PhotoDataService;
