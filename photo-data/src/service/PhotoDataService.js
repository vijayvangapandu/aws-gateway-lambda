'use strict';

const PhotoDataRepository = require("../dao/PhotoDataRepository");

function PhotoDataService(config) {
    console.log("loading PhotoDataService...");
    this.photoDataRepository = new PhotoDataRepository(config);
}

PhotoDataService.prototype.createPhoto = function(photoItem, successSaveCallback, failureSaveCallback) {
    const params = {
        TableName: "PhotoData",
        Item: photoItem
    };

    this.photoDataRepository.createPhoto(params, successSaveCallback, failureSaveCallback);

};


PhotoDataService.prototype.getPhotoById = function(userId, photoId, successSaveCallback, failureSaveCallback) {

    this.photoDataRepository.getPhotoById(userId, photoId, successSaveCallback, failureSaveCallback);

};

PhotoDataService.prototype.deletePhotoById = function(userId, photoId, successSaveCallback, failureSaveCallback) {

    this.photoDataRepository.deletePhotoById(userId, photoId, successSaveCallback, failureSaveCallback);

};

PhotoDataService.prototype.updatePhotoStatus= function(userId, photoId, status, successSaveCallback, failureSaveCallback) {

    this.photoDataRepository.updatePhotoStatus(userId, photoId, status, successSaveCallback, failureSaveCallback);

};

PhotoDataService.prototype.getAllUserPhotos = function(userId, successSaveCallback, failureSaveCallback) {

    this.photoDataRepository.getAllUserPhotos(userId, successSaveCallback, failureSaveCallback);

};

PhotoDataService.prototype.getAllUserApprovedPhotos = function(userId, successSaveCallback, failureSaveCallback) {

    this.photoDataRepository.getAllUserApprovedPhotos(userId, successSaveCallback, failureSaveCallback);

};


module.exports = PhotoDataService;
