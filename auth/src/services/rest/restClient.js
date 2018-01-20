'use strict';

var https = require('https');

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';

function RestClient(host, port, deviceId, platform) {
    this.host = host;
    this.port = port;
    this.deviceId = deviceId;
    this.platform = platform;
}

RestClient.prototype.createRequestOptions = function(method, path, accessToken) {
    return {
        host: this.host,
        port: this.port,
        path: path,
        method: method,
        headers : {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
            'X-eharmony-gdid': this.deviceId,
            'X-eharmony-platform': this.platform
        }
    };
};

RestClient.prototype.get = function(path, accessToken, successCallback, failureCallback) {
    var options = this.createRequestOptions(GET, path, accessToken);
    var request = https.request(options, function (response) {
        response.setEncoding('utf-8');

        if (response.statusCode >= 200 && response.statusCode < 299) {
            var responseString = '';

            response.on('data', function (data) {
                responseString += data;
            });

            response.on('end', function () {
                try {
                    successCallback(JSON.parse(responseString));
                } catch (error) {
                    failureCallback(error);
                }
            })
        } else {
            failureCallback(response.statusCode);
        }
    });

    request.on('error', function(error) {
        failureCallback(error);
    });

    request.end();
};

RestClient.prototype.post = function (path, postBody, accessToken, successCallback, failureCallback) {
    var options = this.createRequestOptions(POST, path, accessToken);
    var request = https.request(options, function (response) {
        response.setEncoding('utf-8');

        var responseString = '';

        response.on('data', function (data) {
            responseString += data;
        });

        response.on('end', function() {
            try {
                successCallback(JSON.parse(responseString));
            } catch (error) {
                failureCallback(error);
            }
        })

        response.on('error', function (error) {
            failureCallback(error);
        })
    });

    request.write(JSON.stringify(postBody));
    request.end();
};

RestClient.prototype.put = function (path, putBody, accessToken, successCallback, failureCallback) {
    var options = this.createRequestOptions(PUT, path, accessToken);
    var request = https.request(options, function (response) {
        response.setEncoding('utf-8');

        var responseString = '';

        response.on('data', function (data) {
            responseString += data;
        });

        response.on('end', function() {
            try {
                successCallback(JSON.parse(responseString));
            } catch (error) {
                failureCallback(error);
            }
        })

        response.on('error', function (error) {
            failureCallback(error);
        })
    });

    request.write(JSON.stringify(putBody));
    request.end();
};

module.exports = RestClient;