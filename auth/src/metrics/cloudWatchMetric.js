'use strict';

// UNITS
// Seconds | Microseconds | Milliseconds | Bytes | Kilobytes | Megabytes | Gigabytes | Terabytes |
// Bits | Kilobits | Megabits | Gigabits | Terabits | Percent | Count | Bytes/Second | Kilobytes/Second |
// Megabytes/Second | Gigabytes/Second | Terabytes/Second | Bits/Second | Kilobits/Second | Megabits/Second |
// Gigabits/Second | Terabits/Second | Count/Second | None

var AWS = require('aws-sdk');
if (!AWS.config.region) {
    console.log("Missing AWS Region");
    AWS.config.update({
        region: 'us-west-2'
    });
}
var cloudwatch = new AWS.CloudWatch();

module.exports.recordCountMetric = function(metricName) {
    putMetric(createCountMetric(metricName));
};

module.exports.recordTimeAndCountMetric = function(metricName, value) {
    putMetric(createTimeAndCountMetric(metricName, value));
};

function putMetric(metric) {
    cloudwatch.putMetricData(metric, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        }
    });
}

function createTimeAndCountMetric(metricName, value) {
    return {
        MetricData: [
            {
                MetricName: metricName + "Time",
                Dimensions: [{
                    Name: 'FunctionName',
                    Value: 'eharmony'
                }],
                Timestamp: new Date(),
                Unit: 'Milliseconds',
                Value: value
            },
            {
                MetricName: metricName + "Count",
                Dimensions: [{
                    Name: 'FunctionName',
                    Value: 'eharmony'
                }],
                Timestamp: new Date(),
                Unit: 'Count',
                Value: 1
            }
        ],
        Namespace: 'PAPI Lambda'
    };

}

function createCountMetric(metricName) {
    return {
        MetricData: [
            {
                MetricName: metricName + "Count",
                Dimensions: [{
                    Name: 'FunctionName',
                    Value: 'eharmony'
                }],
                Timestamp: new Date(),
                Unit: 'Count',
                Value: 1
            }
        ],
        Namespace: 'Alexa Lambda'
    };

}