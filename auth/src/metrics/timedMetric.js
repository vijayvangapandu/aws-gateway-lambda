'use strict';

var CloudWatchMetric = require('./cloudWatchMetric');

module.exports.recordTime = function(metricName, callback) {
    var startTime = new Date();
    return function(response) {
        var endTime = new Date();
        //CloudWatchMetric.recordTimeAndCountMetric(metricName, endTime.getTime() - startTime.getTime());
        callback(response);
    };
};