var customServices = angular.module('customServices', []);

customServices.factory('logFactoryService', function() {
    var messageCount = 0;
    return {
        log: function(msg) {
            console.log("(LOG + " + messageCount++ + ") " + msg);
        }
    };
});

function BaseLogger() {
    this.messageCount = 0;
    this.log = function(msg) {
        console.log(this.msgType + ": " + (this.messageCount++)  + " " + msg);
    };
};

function DebugLogger() { console.log('== constructor called for DebugLogger'); }
DebugLogger.prototype = new BaseLogger();
DebugLogger.prototype.msgType = 'Debug';

function ErrorLogger() { console.log('== constructor called for ErrorLogger'); }
ErrorLogger.prototype = new BaseLogger();
ErrorLogger.prototype.msgType = 'Error';

customServices
    //.service('logService', DebugLogger)
    .service('errorService', ErrorLogger);

customServices.provider("logService", function() {
    var counter = true;
    var debug = true;

    return {
        messageCounterEnabled: function (setting) {
            if (angular.isDefined(setting)) {
                counter = setting;
                return this;
            } else {
                return counter;
            }
        },
        debugEnabled: function(setting) {
            if (angular.isDefined(setting)) {
                debug = setting;
                return this;
            } else {
                return debug;
            }
        },
        $get: function () {
            return {
                messageCount: 0,
                log: function (msg) {
                    if (debug) {
                        console.log("(LOG"
                            + (counter ? " + " + this.messageCount++ + ") " : ") ")
                            + msg);
                    }
                }
            };
        }
    }
});