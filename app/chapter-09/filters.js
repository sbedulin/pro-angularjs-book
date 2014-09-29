angular.module('exampleApp.Filters', []).filter('dayName', function() {
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"];

    return function(value) {
        if(value == null) {
            return '(unknown)';
        }

        return angular.isNumber(value) ? dayNames[value] : value;
    };
});