angular.module('translateApp', [])
    .controller('translateCtrl', function ($scope, $translate) {
        $scope.translate = function(message) {
            return $translate.translate(message);
        };
    })
    .provider({
        $translate: function() {
            this.$get = function () {
                return {
                    translate: function (msg) {
                        return 'OriginalTranslate: ' + msg;
                    }
                };
            };
        }
    });

describe('Translate Controller Test', function() {
    var mockScope;
    var mockTranslate;

    beforeEach(module('translateApp', function($provide) {
        $provide.provider('MockTranslate', function() {
            this.$get = function () {
                return {
                    translate: function (msg) {
                        return 'MockTranslate: ' + msg;
                    }
                };
            }
        });

        $provide.provider('$translate', function() {
            this.$get = function (MockTranslate) {
                return {
                    translate: function (msg) {
                        return MockTranslate.translate(msg);
                    }
                };
            }
        });
    }));

    beforeEach(inject(function($controller, $rootScope, $translate) {
        mockScope = $rootScope.$new();
        mockTranslate = $translate;

        $controller('translateCtrl', {
            $scope: mockScope,
            $translate: mockTranslate
        });
    }));

    it('Translates messages', function () {
        expect(mockScope.translate('cool message')).toEqual('MockTranslate: cool message');
    });
});