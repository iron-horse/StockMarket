'use strict';

angular.module('app.management', ['ngRoute'])
.controller('managementController', ['$scope', '$http', 'InvestorService', 'StockService',
'MarketService', function($scope, $http, InvestorService, StockService, MarketService) {
	var self = $scope;
	var refreshInvestor = function(){
		InvestorService.getAllInvestors().success(function(investors) {
			self.investors = investors;
		}).error(function(data) {
			self.message = data;
			self.messageColor =  'warning';
		});
	};
	var refreshStock = function(){
		StockService.getAllStocks().success(function(stocks) {
			self.stocks = stocks;
		}).error(function(data) {
			self.message = data;
			self.messageColor =  'warning';
		
	});
	};
	self.investors = {};
	self.stocks = {};

	self.marketAction = function(action) {
		MarketService.takeAction(action).success(function(response) {
			self.message = response;
			self.messageColor =  'success';
		}).error(function(data) {
			self.message = data;
			self.messageColor =  'warning';
		});
	};

	self.deselectStock = function() {
		self.edit = false;
		self.stock = null;
	};

	refreshInvestor();
	refreshStock();

	self.addInvestor = function(investor) {
		InvestorService.addInvestor(investor).success(function(response) {
			self.investor = null;
			self.investors.push(response);
			self.message = "Investor added successfully.";
			self.messageColor =  'success';
		}).error(function(data) {
			self.message = data;
			self.messageColor =  'warning';
		});
	};

	self.makeActive = function(investor) {
		InvestorService.makeInvestorActive(investor).success(function(response){
			self.message = response;
			self.messageColor =  'success';
		}).error(function(data) {
			self.message = data;
			self.messageColor =  'warning';
		});
	};	


	self.addStock = function(stock) {
		StockService.add(stock).success(function(response){
			self.stocks.push(response);
			self.deselectStock();
			self.message = "Stock added successfully.";
			self.messageColor =  'success';
		}).error(function(data) {
			self.message = data;
			self.messageColor =  'warning';
		});
	};

	self.updateStock = function(stock) {
		StockService.update(stock).success(function(response){
			self.deselectStock();
			self.message = response;
			self.messageColor =  'success';
		}).error(function(data) {
			self.message = data;
			self.messageColor =  'warning';
		});
	};

	self.editStock = function(stock) {
		self.edit = true;
		self.stock = stock;
	};        

}]);

