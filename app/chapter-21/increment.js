angular.module('increment', [])
.directive('increment', function() {
    return {
        restrict: 'E',
        scope: {
            value: '=value'
        },
        link: function(scope, element) {
            var btn = angular.element('<button>').text('+');
            btn.addClass('btn btn-primary btn-xs');
            element.append(btn);
            btn.on('click', function() {
                scope.$apply(function() {
                    scope.value++;
                });
            });
        }
    };
});