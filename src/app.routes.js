'use strict';

angular.module('app.routes',
                ['ngRoute'])
.config(config);

function config ($locationProvider, $routeProvider) {
	$locationProvider.hashPrefix('!');
	$routeProvider.
	when('/', {
		templateUrl: 'views/market.html',
		controller: 'marketController'
	})
	.when('/management', {
		templateUrl: 'views/management.html',
		controller: 'managementController'
	})
	.when('/investor', {
		templateUrl: 'views/investor.html',
		controller: 'investorController'
	})
	.otherwise({
		redirectTo: '/'
	});
}
