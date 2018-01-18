'use strict';

function UserService(userRestClient) {
    this.userRestClient = userRestClient;
}

UserService.prototype.getUser = function(accessToken, successCallback, failureCallback) {
    this.userRestClient.getUser(accessToken, successCallback, failureCallback);
};

UserService.prototype.getAuthUser = function(accessToken) {
    var response = [];
    this.userRestClient.getUser(accessToken, function(data) {
        response = data;
    } , function(error) {
        console.log(error);
    });
    return response;
};

module.exports = UserService;