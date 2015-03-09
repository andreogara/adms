var artistSpace = angular.module('artistSpace', ['ngAnimate']);
//Initializing the data and populating the offline database
artistSpace.factory("dataFactory", ['$http', function($http){
	var urlBase = "/data";
	var offlineData;
	 return {
		 getData : function(){
			 if(!window.indexedDB)
			return $http.get(urlBase);
			else{
				var promise = $http.get(urlBase);
				promise.then(function(result){
					var data = result.data;
					var request = indexedDB.open("daemonbits", 72);
					request.onerror = function(event) {
						console.log("Error creating IndexedDB");
					};
					request.onupgradeneeded = function(e){
						var db = e.target.result;
						if (db.objectStoreNames.contains('artists')) {
							db.deleteObjectStore('artists');
						}
						var storage = db.createObjectStore("artists", {autoIncrement: true});
						for (var i in result.data)
							storage.add(result.data[i])
						storage.openCursor().onsuccess = function(event){
							var cursor = event.target.result;
						}
					}
				}, function(err){
					console.log(err);
				}).then(function(){
					return offlineData;
				});
			}
		 }
	 }
}]);
//Controller for the list Page
artistSpace.controller("ListController", ['$scope', '$http', '$routeParams', '$rootScope', 'dataFactory', function ($scope, $http, $routeParams, $rootScope, dataFactory){
	$scope.artistsOrder = "reknown";
	$scope.query = "";
	if (!window.indexedDB){
	dataFactory.getData().then(function(result){
		$scope.artists = result.data;
	});
	}
	else
		console.log(dataFactory.getData());
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