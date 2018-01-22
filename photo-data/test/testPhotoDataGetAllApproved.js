
const exprextedPhotoItem =  {
    "UserId":  "75077954",
    "PhotoId": "2",
    "Index":  1,
    "Status": 1,
    "Caption": "My First Test Photo",
    "CStatus": 1
};
const userId = "75077954";

var environment = process.env.ENVIRONMENT;
var evnResolved = 'dev';
if(environment) {
    evnResolved = environment;
}
const config = require('../src/config/' + evnResolved + '-config.json');

var PhotoDataService = require("../src/service/PhotoDataService");
var photoDataService = new PhotoDataService(config);

photoDataService.getAllUserApprovedPhotos(userId, successCallback, failureCallback);

function successCallback(data) {
    console.log("Get all photos : ", data);
}
function failureCallback(error) {
    console.log("Failed to Get all photos, with error: ", error);
}