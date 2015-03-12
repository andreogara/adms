var artistSpace = angular.module('artistSpace', ['ngAnimate']);
//Initializing the data and populating the offline database
//Controller for the list Page
artistSpace.controller("ListController", ['$scope', '$http', '$routeParams', 'dataFactory', function ($scope, $http, $routeParams, dataFactory){
    $scope.artistsOrder = "reknown";
    $scope.query = "";
        dataFactory.getData().then(function(result){
            $scope.artists = result.offlineData;
        });

}]);
artistSpace.factory("dataFactory", ['$http', '$log', '$q', function($http, $log, $q) {
    var urlBase = "/data",//url for the api call to MongoDB instance running on AWS
        db,
        deferred = $q.defer();
    // Data from indexedDB is stored here by the cursor and should be returned to controller that calls this factory
    return {
        getData: function () {
            if (!window.indexedDB) {  //if there's no indexedDB support, return a promise
                $http.get(urlBase) //object of the api call and let the controller handle data retrieval
                    .success(function(data) {
                        deferred.resolve({
                            offlineData: data
                        });
                    }).error(function (msg, code) {
                        deferred.reject(msg);
                        $log.error(msg, code);
                    });
                return deferred.promise;
            }
            else{
                dbSetup();
                function dbSetup(){
                    var version = 8,
                        dbName = "daemonbytes",
                        strName = "artists",
                        request = window.indexedDB.open(dbName, version);
                    request.onsuccess = function(e){
                        db = e.target.result;
                        var artistStore = db.transaction("artists", "readwrite").objectStore("artists"),
                            offlineData = [];
                        artistStore.openCursor().onsuccess = function(event) {
                            var cursor = event.target.result;
                            if (cursor) {
                                 offlineData.push(cursor.value);
                                 cursor.continue();
                            }
                            else{
                                deferred.resolve({
                                    offlineData: offlineData
                                });
                            }

                        };
                    };
                    request.onerror = dbError;
                    request.onupgradeneeded = function(e){
                        db = e.target.result;
                        if (db.objectStoreNames.contains("artists")) {
                            db.deleteObjectStore("artists");
                        }
                        $http.get(urlBase)
                            .success(function(data){
                                var artistStore = db.transaction("artists", "readwrite").objectStore("artists");
                                for (var i in data){
                                    artistStore.add(data[i]);
                                }
                            });
                    };
                }
                function dbError(e){
                    console.error("An Error has occured", e);
                    deferred.reject(msg);
                }
                return deferred.promise;
            }
        }
    }
}]);
artistSpace.controller("DetailsController", ['$scope', '$http', '$routeParams', 'dataFactory', function ($scope, $http, $routeParams, dataFactory){
    dataFactory.getData().then(function(result){
        $scope.id = $routeParams.id;
        $scope.artists = result.offlineData;
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
    });
}]);
//Handler for the details page
artistSpace.controller("HomeController", ['$scope', '$http', '$routeParams' , function ($scope, $http, $routeParams){
    $scope.myVar = "Welcome To Artists Management Database";
    $scope.myVar2 = "Take a dive in";
    $scope.myVar3 = "Details";
}]);