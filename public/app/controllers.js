var artistSpace = angular.module('artistSpace', ['ngAnimate']);
//Initializing the data and populating the offline database
artistSpace.factory("dataFactory", ['$http', function($http){
    var urlBase = "/data", //url for the api call to MongoDB instance running on AWS
        offlineData = []; // Data from indexedDB is stored here by the cursor and should be returned to controller that calls this factory
    return {
        getData : function(){
            if(!window.indexedDB)  //if there's no indexedDB support, return a promise
                return $http.get(urlBase); //object of the api call and let the controller handle data retrieval
            else{
                var promise = $http.get(urlBase); //if there's indexedDB support, then fetch data from api before setting up indexedDB database.
                promise.then(function(result){ //use callback to setup indexedDB.
                    var data = result.data;
                    var request = indexedDB.open("daemonbits", 82);
                    request.onerror = function(event) {
                        console.log("Error creating IndexedDB");
                    };
                    request.onupgradeneeded = function(e){
                        var db = e.target.result;
                        if (db.objectStoreNames.contains('artists')) {
                            db.deleteObjectStore('artists');
                        }
                        var storage = db.createObjectStore("artists", {autoIncrement: true});
                        for (var i in result.data) //loop through data from api call
                            storage.add(result.data[i]); //store data in indexedDB storage
                        storage.openCursor().onsuccess = function(event) { //open cursor to indexedDB
                            var cursor = event.target.result;
                            if (cursor) {
                                offlineData.push(cursor.value);
                                cursor.continue();
                            }
                        }
                    }
                }, function(err){
                    console.log(err);
                }).then(function(){ //callback after indexedDB has been setup, populated and cursor opened
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