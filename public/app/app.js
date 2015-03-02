angular.module('appSpace', ['ngRoute', 'artistSpace']);
angular.module("appSpace").config(function($routeProvider, $locationProvider){
$locationProvider.html5Mode({
  enabled: true,
  requireBase: false
	});
			$routeProvider
				.when('/names', {
					templateUrl : 'partials/list',
					controller : 'ListController'
				}).
				otherwise({
						redirectTo: '/'
				});
	});