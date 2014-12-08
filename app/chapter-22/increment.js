angular.module('increment', [])
.directive('increment', function() {
    return {
        restrict: 'E',
        scope: {
            item: '=item',
            property: '@propertyName',
            restful: '@restful',
            methodName: '@methodName'
        },
        link: function(scope, element) {
            var btn = angular.element('<button>').text('+');
            btn.addClass('btn btn-primary btn-xs');
            element.append(btn);
            btn.on('click', function() {
                scope.$apply(function() {
                    scope.item[scope.property]++;
                    if(scope.restful) {
                        scope.item[scope.methodName]();
                    }
                });
            });
        }
    };
});