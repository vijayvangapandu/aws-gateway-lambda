'use strict';

var CountMetric = require('../metrics/countMetric');

const TOKEN_ERROR_MESSAGE = "AUTHENTICATION_ERROR";
const LINK_ERROR_MESSAGE = "AUTHENTICATION_MESSAGE";

function filter(handler) {
    return function(arg1, arg2, arg3) {
        var accessToken;

        if ('session' in this.event &&
            'user' in this.event.session) {
            accessToken = this.event.session.user.accessToken;
        }

        if (!accessToken) {
            linkAccount(this, LINK_ERROR_MESSAGE);
        } else {
            handler.call(this, arg1, arg2, arg3);
        }
    };
}

function linkAccount(alexa, message) {
    alexa.emit(':tellWithLinkAccountCard', alexa.t(message));
}

module.exports.applyFilter = function(handlers) {
    var wrappedHandlers = {};
    for (var handlerName in handlers) {
        wrappedHandlers[handlerName] = filter(handlers[handlerName]);
    }
    return wrappedHandlers;
};

module.exports.handleError = function(error, alexa, next) {
    if (error == 401) {
        CountMetric.recordCount("AuthenticationErrors");
        linkAccount(alexa, TOKEN_ERROR_MESSAGE);
    } else {
        next.handleError(error, alexa);
    }
};