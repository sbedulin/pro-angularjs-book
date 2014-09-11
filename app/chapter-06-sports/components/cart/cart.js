angular.module('cart', [])
    .constant('componentPath', 'components/cart/')
    .factory('cart', function() {
        var cartData = [];

        return {
            addProduct: function(id, name, price) {
                var addedToExistingItem = false;
                for(var i = 0; i < cartData.length; i++) {
                    if(cartData[i].id == id) {
                        cartData[i].count++;
                        addedToExistingItem = true;
                        break;
                    }
                }
                if(!addedToExistingItem) {
                    cartData.push({
                        count: 1,
                        id: id,
                        price: price,
                        name: name
                    });
                }
            },

            removeProduct: function(id) {
                for(var i = 0; i < cartData.length; i++) {
                    if(cartData[i].id == id) {
                        cartData.splice(i, 1);
                        break;
                    }
                }
            },

            getProducts: function() {
                return cartData;
            }
        };
    })
    .directive('cartSummary', function(cart, componentPath) {
        return {
            restrict: 'E',
            templateUrl: componentPath + 'cartSummary.html',
            controller: function($scope) {
                var cartData = cart.getProducts();

                $scope.stylePath = componentPath + 'cart.css';

                $scope.total = function() {
                    var total = 0;
                    for(var i = 0; i < cartData.length; i++) {
                        total += (cartData[i].price * cartData[i].count);
                    }
                    return total;
                };

                $scope.itemCount = function() {
                    var total = 0;
                    for(var i = 0; i < cartData.length; i++) {
                        total += cartData[i].count;
                    }
                    return total;
                };
            }
        };
    });