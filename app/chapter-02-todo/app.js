var model = {
    user: "Someone"
};

var todoApp = angular.module('todoApp', []);

todoApp.run(function($http) {
    $http.get('data.json').success(function(data) {
        model.items = data;
    });
});

todoApp.controller('ToDoCtrl', function ($scope) {
    $scope.todo = model;

    $scope.incompleteCount = function() {
        var count = 0;
        angular.forEach($scope.todo.items, function(item) {
            if(!item.done) { count++; }
        });
        return count;
    };

    $scope.warningLevel = function() {
        return $scope.incompleteCount() < 3 ? 'label-success' : 'label-warning';
    };

    $scope.addNewItem = function(actionText) {
        $scope.todo.items.push({ action: actionText, done: false });
    };
});

todoApp.filter('boolToString', function() {
    return function(bool) {
        return bool ? 'Yes' : 'No';
    };
});

todoApp.filter('checkedItems', function() {
    return function(items, showComplete) {
        if(showComplete) {
            return items;
        }
        else {
            var results = []
            angular.forEach(items, function(item) {
                if(!item.done) {
                    results.push(item);
                }
            });
            return results;
        }
    }
});