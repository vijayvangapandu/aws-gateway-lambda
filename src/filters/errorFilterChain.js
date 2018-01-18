'use strict';
var AuthenticationFilter = require('./authenticationFilter');
var CountMetric = require('../metrics/countMetric');

function ErrorFilterChain() {
    this.errorFilters = [AuthenticationFilter.handleError];
    this.currentFilter = 0;
}

ErrorFilterChain.prototype.handleError = function(error, alexa) {
    if (!this.errorFilters || this.currentFilter >= this.errorFilters.length) {
        console.log(error);
        CountMetric.recordCount("ErrorHandlerErrors");
        alexa.emit(':tell', alexa.t("GENERIC_ERROR"));
    } else {
        var filter = this.errorFilters[this.currentFilter];
        this.currentFilter++;
        filter(error, alexa, this);
    }
};

module.exports.handleError = function(error, alexa) {
    new ErrorFilterChain().handleError(error, alexa);
};