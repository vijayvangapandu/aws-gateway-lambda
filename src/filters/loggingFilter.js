'use strict';

var CountMetric = require('../metrics/countMetric');

function filter(handler, handlerName) {
    return function(arg1, arg2, arg3) {
        if (process.env.NODE_ENV !== 'test') {
            if ('session' in this.event &&
                'user' in this.event.session) {
                console.log("SessionId: " + this.event.session.sessionId);
                console.log("UserId: " + this.event.session.user.userId);
            }
            console.log("Calling handler: " + handlerName);
            CountMetric.recordCount(handlerName);
        }
        handler.call(this, arg1, arg2, arg3);
    };
}

module.exports.applyFilter = function(handlers) {
    var wrappedHandlers = {};
    for (var handlerName in handlers) {
        wrappedHandlers[handlerName] = filter(handlers[handlerName], handlerName);
    }
    return wrappedHandlers;
};