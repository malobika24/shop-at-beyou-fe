const searchController = function($scope, $stateParams , databaseService, $location) {
	$scope.brand =  $stateParams.brand;
	$scope.gender =  $stateParams.gender;
    $scope.queryString = $location.search().query;
    $scope.discountType =  $stateParams.type;
    $scope.currentPage = 0;
    $scope.currentCategory = '';
    $scope.itemsPerPage = 5;
    $scope.noResults = '';
    $scope.numPages = 1;
    $scope.nav = 'All';
    

    loadItems();
    

    function loadItems() {
    	$("#loader").show();
    	$("#results").hide();
    	
    	if($scope.queryString){
    		$scope.currentCategory=$scope.queryString;
    		$scope.nav = $scope.queryString;
    	}
    	else if($scope.gender){
    		getItemsByGender($scope.gender);
    		$scope.nav = $scope.gender;
    	}
    	let url = `/api/getitems?category=${$scope.currentCategory}&&page=${$scope.currentPage}&&limit=${$scope.itemsPerPage}`;
    	if($scope.brand){
    		url= `/api/getitemsbybrand/${$scope.brand}?page=${$scope.currentPage}&&limit=${$scope.itemsPerPage}`;
    		$scope.nav = $scope.brand;
    	}
    	else if($scope.discountType=='sale'){
    		url= `/api/getitemsOnSale?page=${$scope.currentPage}&&limit=${$scope.itemsPerPage}`;
    		$scope.nav = 'Sale';
    	}
    	else if($scope.discountType=='new'){
    		url= `/api/getNewItems?page=${$scope.currentPage}&&limit=${$scope.itemsPerPage}`;
    		$scope.nav = 'New Arrivals';
    	}
    	$("#navLink").text($scope.nav);
    	databaseService.getFromDatabase(url)
            .then((items) => {
            	$("#loader").hide();
                $scope.items = items.products;
                $scope.numPages = items.noOfPages;
                if($scope.numPages > 0 )
                	$scope.noResults = 'false';
                else
                	$scope.noResults = 'true';
                $("#results").show();
            });
    }
    
    $scope.getPrevPage = function() {
    	if($scope.currentPage!=0){
    		$scope.currentPage = $scope.currentPage - 1;
    		loadItems();
    	}
    };
    
    $scope.getNextPage = function() {
    	if($scope.currentPage!=($scope.numPages - 1)){
    		$scope.currentPage = $scope.currentPage + 1;
    		loadItems();
    	}
    };
    
    $scope.getLastPage = function() {
    	if($scope.currentPage!=($scope.numPages - 1)){
    		$scope.currentPage = $scope.numPages - 1;
    		loadItems();
    	}
    };

    $scope.range = function() {
        const arr = [];
        for (let i = 1; i <= $scope.numPages; i++) {
            arr.push(i);
        }
        return arr;
    };
    
    function getItemsByGender(gender) {
    	if(gender=='All')
    		$scope.currentCategory = '';
    	else if (gender=='Men')
    		$scope.currentCategory = ' Men';
    	else if (gender=='Women')
    		$scope.currentCategory = ' Women';
    }
    
    $scope.getMens = function() {
    	$scope.currentCategory = ' Men';
    	loadItems();
    };
    
    $scope.getWomens = function() {
    	$scope.currentCategory = ' Women';
    	loadItems();
    };

};

angular.module('myApp')
    .component('mySearch', {
        controller: searchController,
        templateUrl: 'app/components/search/search.html'
    })
    .config(function($stateProvider) {
        $stateProvider
            .state('search', {
                url: '/collections',
                component: 'mySearch'
            })
            .state('searchByBrand', {
                url: '/collections/{brand}',
                component: 'mySearch'
            })
            .state('searchByGender', {
                url: '/collections/category/{gender}',
                component: 'mySearch'
            })
            .state('searchByDiscount', {
                url: '/collections/{type}',
                component: 'mySearch'
            });
    });