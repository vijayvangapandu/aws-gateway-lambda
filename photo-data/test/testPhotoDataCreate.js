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

var photoItem =  {
    "UserId":  "75077938",
    "PhotoId": "11",
    "Index":  1,
    "Status": 1,
    "Caption": "My First Test Photo",
    "CStatus": 1
};

process.env.ENVIRONMENT = "dev";
var PhotoDataService = require("../src/service/PhotoDataService");
var photoDataService = new PhotoDataService();

photoDataService.createPhoto(photoItem, successCallback, failureCallback);

function successCallback(data) {
    console.log("Created photo Item: ", data);
}
function failureCallback(error) {
    console.log("Failed to save photo Item, with error: ", error);
}