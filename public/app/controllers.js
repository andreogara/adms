var artistSpace = angular.module('artistSpace', ['ngAnimate']);
//Initializing the data and populating the offline database
artistSpace.factory("dataFactory", ['$http', function($http){
	 var urlBase = '/data';
     var dataFactory = {};
	
    dataFactory.getArtists = function () {
       if (!window.indexedDB) {
			return $http.get(urlBase);
		}
		else{
			var customData = [{name:"Roger"}, {name:"Rafa"}];
			var request = indexedDB.open("daemonbits", 55);
			request.onerror = function(event) {
				console.log("Why didn't you allow my web app to use IndexedDB?!");
			};
			request.onsuccess = function(e) {
				var db = e.target.result,
					promise = $http.get(urlBase);
				promise.then(function(result){
					var transaction = db.transaction(["artists"],"readwrite"),
						store = transaction.objectStore("artists");
					for (var i in result.data){
						console.log("adding item number "+ i);
						store.add(result.data[i]);
					}
				});
			};
			request.onupgradeneeded = function(e){
				var db = e.target.result;
				if (db.objectStoreNames.contains('artists')) {
					db.deleteObjectStore('artists');
				}
				var storage = db.createObjectStore("artists", {autoIncrement: true});
			}
		} 

    };
	return dataFactory;
}]);
//Controller for the list Page
artistSpace.controller("ListController", ['$scope', '$http', '$routeParams', '$rootScope', 'dataFactory', function ($scope, $http, $routeParams, $rootScope, dataFactory){
	$scope.artistsOrder = "reknown";
	$scope.query = "";
	getArtists();
	function getArtists(){
		if (!window.indexedDB){
			dataFactory.getArtists().success(function(data){
				$scope.artists = data;
			});
		}
		else{
			dataFactory.getArtists();
		}
		
	}
}]);

artistSpace.controller("DetailsController", ['$scope', '$http', '$routeParams', '$rootScope' , function ($scope, $http, $routeParams, $rootScope){
	$scope.id = $routeParams.id;
	$scope.artists = $rootScope.artists;
	$scope.whichItem = $scope.id;
	if ($scope.id > 0){
		$scope.prevItem = Number($scope.id) - 1;
	}
	else {
		$scope.prevItem = $scope.artists.length - 1;
	}
	if($routeParams.id < $scope.artists.length - 1){
		$scope.nextItem = Number($scope.id) + 1;
	}
	else{
		$scope.nextItem = 0;
	}
}]);
//Handler for the details page
artistSpace.controller("HomeController", ['$scope', '$http', '$routeParams' , function ($scope, $http, $routeParams){
	$scope.myVar = "Welcome To Artists Management Database";
	$scope.myVar2 = "Take a dive in";
	$scope.myVar3 = "Details";
}]);