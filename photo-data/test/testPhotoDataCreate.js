//var fs = require('fs');


/*var allPhotos = JSON.parse(fs.readFileSync('../../photodata.json', 'utf8'));
 allPhotos.forEach(function(photo) {
 var params = {
 TableName: "PhotoData",
 Item: {
 "UserId":  photo.userId,
 "PhotoId": photo.photoId,
 "Index":  photo.index,
 "Status": photo.status,
 "Caption": photo.caption,
 "CTime": photo.createdTime,
 "CStatus": photo.captionStatus,
 "UTime" : photo.updatedTime,
 "ApprovedBy" : photo.approvedBy
 }
 };
 photoDataRepository.createPhoto(params, successCallback, failureCallback);

 });*/

const exprextedPhotoItem =  {
    "UserId":  "75077954",
    "PhotoId": "1",
    "Index":  1,
    "Status": 1,
    "Caption": "My First Test Photo",
    "CStatus": 1
};
const userId = "75077939";
const photoId = "11";
var environment = process.env.ENVIRONMENT;
var evnResolved = 'dev';
if(environment) {
    evnResolved = environment;
}
const config = require('../src/config/' + evnResolved + '-config.json');

var PhotoDataService = require("../src/service/PhotoDataService");
var photoDataService = new PhotoDataService(config);

photoDataService.createPhoto(exprextedPhotoItem, successCallback, failureCallback);

function successCallback(data) {
    console.log("Created photo Item: ", data);
}
function failureCallback(error) {
    console.log("Failed to save photo Item, with error: ", error);
}