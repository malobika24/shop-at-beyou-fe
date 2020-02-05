const itemController = function($scope, $stateParams, databaseService, $location) {
    $scope.itemId =  Number($stateParams.itemId);
    $scope.item = {};
    $scope.stars = 0;
    $scope.numReviews = 0;
    $scope.reviews = [];
    $scope.relatedItems = [];
    $scope.review = {};
    $scope.currency ='$';
    $scope.cart =[];

    loadItem();
    //loadRelatedItems();

    function loadRelatedItems() {
        databaseService.getFromDatabase(`/api/getrelateditems?type=${$scope.item.attribute3Value}`)
            .then((items) => {
                $scope.relatedItems = items.products;
            });
    }

    function loadItem() {
        databaseService.getFromDatabase(`/api/getitem/${$scope.itemId}`)
            .then((item) => {
                $scope.item = item;
                loadRelatedItems();
                if (item.reviews) {
                    $scope.numReviews = item.reviews.length;

                    let stars = 0;
                    for (let i = 0; i < $scope.numReviews; i++) {
                        const review = item.reviews[i];
                        stars += review.stars;
                    }

                    if ($scope.numReviews > 0) {
                        $scope.stars = stars / $scope.numReviews;
                        $scope.reviews = item.reviews;
                    }
                }
            });
    }

    $scope.getNumStars = function(num) {
        return $scope.stars > num ? 'glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty';
    };

    $scope.submitReview = function(id, review) {
        $scope.review = angular.copy(review);
        databaseService.postToDatabase(`/api/addreview/${id}`, review)
            .then(() => {
                $scope.review = {}; // reset to clear out current values
                loadItem();
            })
            .catch(() => {
                $scope.review = {}; // reset to clear out current values
                loadItem();
            });

    };

    $scope.addToCart = function() {
        const userId = databaseService.guidHandler('load');
        var cart =localStorage.getItem(userId);
        if (cart =='null' || cart=='' || cart==null) {
        	console.log('setting'+$scope.cart );
        	cart = '[]';
        }
        var cartObj = JSON.parse(cart);
        _addCart(cartObj);
        localStorage.setItem(userId, JSON.stringify(cartObj) );
        $location.path('/cart');
    };
    $scope.goBack = function() {
    	  window.history.back();
    };
    
    function _addCart(cartObj){
    	var newProduct = {
			 itemId: $scope.itemId,
			 productDesc: $scope.item.description,
			 size: $scope.item.attribute1Value,
			 quantity :1,
			 price: $scope.item.productPrice.price
	     };
    	cartObj.push(newProduct);
    }
    function _updateCart(){
		 var newProduct = new function() {
			 this.itemId= $scope.item.id;
			 this.productDesc= $scope.item.description;
			 this.quantity =1;
			 this.price=$scope.item.productPrice.price;
	     }
		 $scope.cart.push(newProduct);
		 console.log('Updating cart'+$scope.cart)
    }

};

angular.module('myApp')
    .component('myItem', {
        controller: itemController,
        templateUrl: 'app/components/item/item.html'
    })
    .config(function($stateProvider) {
        $stateProvider
            .state('item', {
                url: '/item/{itemId}',
                component: 'myItem'
            });
            
    });
