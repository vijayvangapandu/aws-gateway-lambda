'use strict';

var CloudWatchMetric = require('./cloudWatchMetric');

module.exports.recordCount = function(metricName) {
    CloudWatchMetric.recordCountMetric(metricName);
};