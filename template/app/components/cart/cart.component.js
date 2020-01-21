const cartController = function($scope, $stateParams, databaseService) {
    $scope.guid = databaseService.guidHandler('load');
    $scope.cart = [];
    $scope.total = 0;

    getCartContents();

    function getCartContents() {
    	$('#orderPlacedDiv').hide();
    	const userId = databaseService.guidHandler('load');
    	var cartJson  = localStorage.getItem(userId);
    	$scope.cart = JSON.parse(cartJson);
    	if($scope.cart){
	    	for(let i=0;i<$scope.cart.length; i++){
	    		$scope.total=$scope.total+ $scope.cart[i].price;
	    	}
    	}
    }
    $scope.checkout = function() {
    	$('#cartId').hide();
    	$('#orderPlacedDiv').show();
    	$scope.cart = [];
    	const userId = databaseService.guidHandler('load');
    	localStorage.setItem(userId, null);
    	
    };
};

angular.module('myApp')
    .component('myCart', {
        controller: cartController,
        templateUrl: 'app/components/cart/cart.html'
    })
    .config(function($stateProvider) {
        $stateProvider
            .state('cart', {
                url: '/cart',
                component: 'myCart'
            });
    });

