'use strict';

angular.module('app.market', ['ngRoute'])
.controller('marketController', ['$scope', '$http', 'StockService', function($scope, $http, StockService) {
	var self = $scope;
	self.stocks = {};
	StockService.getAllStocks().success(function (stocks) {
		self.stocks = stocks;
	}); 
}]);

