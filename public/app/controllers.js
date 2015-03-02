var artistSpace = angular.module('artistSpace', ['ngAnimate']);
artistSpace.controller("ListController", ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams){
 $http.get('/data').success(function(data) {
    $scope.artists = data;
	$scope.artistsOrder = "name";
  })
}]);

artistSpace.controller("DetailController", ['$scope', '$http', '$routeParams' , function ($scope, $http, $routeParams){
	$scope.myVar = "Hello Angular";
}]);

artistSpace.controller("HomeController", ['$scope', '$http', '$routeParams' , function ($scope, $http, $routeParams){
	$scope.myVar = "Welcome To Artists Management Database";
	$scope.myVar2 = "Take a dive in";
}]);