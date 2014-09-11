angular.module('sportsStore')
    .constant('productListActiveClass', 'btn-primary')
    .constant('productListPageCount', 3)
    .controller('productListCtrl', function($scope, $filter,
        productListActiveClass, productListPageCount, cart) {
        var selectedCategory = null;

        $scope.selectedPage = 1;
        $scope.pageSize = productListPageCount;

        $scope.selectPage = function(newPage) {
            $scope.selectedPage = newPage;
        };

        $scope.selectCategory = function(newCategory) {
            selectedCategory = newCategory;
            $scope.selectedPage = 1;
        };

        $scope.categoryFilterFn = function(product) {
            return selectedCategory == null || product.category == selectedCategory;
        };

        $scope.getCategoryClass = function(category) {
            return category == selectedCategory ? productListActiveClass : '';
        };

        $scope.getPageClass = function(page) {
            return page == $scope.selectedPage ? productListActiveClass : '';
        };

        $scope.addProductToCart = function(product) {
            cart.addProduct(product.id, product.name, product.price);
        };
    });