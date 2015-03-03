var artistSpace = angular.module('artistSpace', ['ngAnimate']);
artistSpace.controller("ListController", ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams){
 
$scope.artistsOrder = "reknown";
$scope.query = "";

$scope.watchRadio = function(){
	console.log($scope.artistsOrder);
}
 $http.get('/data').success(function(data) {
 $scope.artists = data;
 console.log(data);
 })

 $scope.dummy = [
    { name: "Peter",   age: 20 },
    { name: "Pablo",   age: 55 },
    { name: "Linda",   age: 20 },
    { name: "Marta",   age: 37 },
    { name: "Othello", age: 20 },
    { name: "Markus",  age: 32 }
  ];
$scope.filterFunction = function(element) {
    return element.name.match(/^Ma/) ? true : false;
  };

}]);

artistSpace.controller("DetailController", ['$scope', '$http', '$routeParams' , function ($scope, $http, $routeParams){
	$scope.myVar = "Hello Angular";
}]);

artistSpace.controller("HomeController", ['$scope', '$http', '$routeParams' , function ($scope, $http, $routeParams){
	$scope.myVar = "Welcome To Artists Management Database";
	$scope.myVar2 = "Take a dive in";
}]);