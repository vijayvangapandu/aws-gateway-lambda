'use strict';

var Promise = require('promise');
//var TimedMetric = require('../../metrics/timedMetric');

const userPath = "/auth/v1.0/me?AWS=true";

function UserRestClient(restClient) {
    this.restClient = restClient;
}

UserRestClient.prototype.getUser = function(accessToken, successCallback, failureCallback) {
    this.restClient.get(userPath, accessToken, successCallback, failureCallback);
        //TimedMetric.recordTime("getUser", successCallback),
        //TimedMetric.recordTime("getUserErrors", failureCallback));
};

UserRestClient.prototype.getUserAsync = function(accessToken) {
    var _this = this;
    return new Promise(function (fulfill, reject) {
        _this.getUserInfo(accessToken, function(value) {
            fulfill(value);
        }, function(error) {
            reject(error);
        });
    });
};

module.exports = UserRestClient;