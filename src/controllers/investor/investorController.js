'use strict';

angular.module('app.investor', ['ngRoute'])
.controller('investorController', ['$scope','$http','StockService', 'InvestorService', function($scope, $http, StockService, InvestorService) {
	var self = $scope;
	self.myInvestor = {};
	self.stocks = {};
	self.refresh = function () {
		InvestorService.getActiveInvestors().success(function(investor) {
			self.myInvestor = investor;
			self.stocks = investor.stocks;
		}).error(function(data, status) {
			console.error('Repos error', status, data);
		});
	};
	self.refresh();
	self.deselect = function () {
		self.stock = null;
	};
	self.buy = function (stock) {
		StockService.buyStock(stock.symbol, stock.quantity).success(function(response){
			self.deselect();
			self.refresh();
			self.message = response;
			self.messageColor = 'success';
		}).error(function(data, status) {
			self.message = data;
			self.messageColor = 'warning';
			console.error('Repos error', status, data);
		});
	};

	self.sell = function (stock) {
		StockService.sellStock(stock.symbol, stock.quantity).success(function(response){
			self.deselect();
			self.refresh();
			console.log(response);
			self.message = response;
			self.messageColor = 'success';
		}).error(function(data, status) {
			self.message = data;
			self.messageColor = 'warning';
			console.error('Repos error', status, data);
		});
	};
}]);
