angular.module('sportsStore')
    .constant('dataUrl', 'http://localhost:5000/products')
    .controller('sportsStoreCtrl', function($scope, $http, dataUrl) {
        $scope.data = {};

        $http.get(dataUrl)
            .success(function(data) {
                $scope.data.products = data;
            })
            .error(function(error) {
                error = error || { status: 'Unknown error' }
                $scope.data.error = error;
            });
    });