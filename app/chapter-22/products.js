angular.module('exampleApp', ['increment', 'ngResource', 'ngRoute'])
.constant('baseUrl', 'http://localhost:5500/products/')
.factory('ProductsResource', function($resource, baseUrl) {
    return $resource(baseUrl + ':id', { id: '@id' },
        { create: { method: 'POST' }, save: { method: 'PUT' } });
})
.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false);

    $routeProvider.when('/edit/:id', {
        templateUrl: 'editorView.html',
        controller: 'editCtrl'
    });

    $routeProvider.when('/create', {
        templateUrl: 'editorView.html',
        controller: 'editCtrl'
    });

    $routeProvider.otherwise({
        templateUrl: 'tableView.html',
        controller: 'tableCtrl',
        resolve: {
            data: function(ProductsResource) {
                return ProductsResource.query();
            }
        }
    });
})
.controller('tableCtrl', function($scope, $location, $route, data) {
    $scope.data.products = data;

    $scope.refreshProducts = function() {
        $route.reload();
    };
})
.controller('editCtrl', function($scope, $routeParams, $location) {
    $scope.currentProduct = null;

    if($location.path().indexOf('/edit/') === 0) {
        var id = $routeParams.id;
        for(var i = 0; i < $scope.data.products.length; i++) {
            if($scope.data.products[i].id === id) {
                $scope.currentProduct = $scope.data.products[i];
                break;
            }
        }
    }

    $scope.cancelEdit = function () {
        $location.path('/list');
    };

    $scope.updateProduct = function (product) {
        product.$save().then(function() {
            $location.path('/list');
        });
    };

    $scope.saveEdit = function (product) {
        if (angular.isDefined(product.id)) {
            $scope.updateProduct(product);
        } else {
            $scope.createProduct(product);
        }
        $scope.currentProduct = {};
    };
})
.controller('defaultCtrl', function($scope, $location, ProductsResource) {
    $scope.data = {};

    $scope.createProduct = function(product) {
        new ProductsResource(product).$create().then(function(newProduct) {
            $scope.data.products.push(newProduct);
            $location.path('/list');
        });
    };

    $scope.deleteProduct = function(product) {
        product.$delete().then(function() {
            $scope.data.products.splice($scope.products.indexOf(product), 1);
        });

        $location.path('/list');
    };
});

