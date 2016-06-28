'use strict';

angular.module('app.services')
.factory('StockService', function($http) {
	return {
		getAllStocks: function() {
			return $http.get('/stocks');
		},
		getStock: function(stockSymbol) {
			return $http.get('/stocks/' + stockSymbol);
		},
		add: function(stock) {
			return $http({
			method: 'POST',
			url: '/stocks',
			headers: {
				'Content-Type': 'application/json'
			},
			data: stock
			});
		},
		update: function(stock) {
			return $http({
				method: 'PUT',
				url: '/stocks/'+ stock.symbol,
				headers: {
					'Content-Type': 'application/json'
				},
				data: stock
			});
		},
		buyStock: function(stockSymbol, quantity) {
			return $http({
				method: 'PATCH',
				url: '/stocks/buy/' + stockSymbol,
				headers: {
					'Content-Type': 'application/json'
				},
				data: {quantity: quantity}
			});
		},
		sellStock: function(stockSymbol, quantity) {
			return $http({
				method: 'PATCH',
				url: '/stocks/sell/' + stockSymbol,
				headers: {
					'Content-Type': 'application/json'
				},
				data: {quantity: quantity}
			});
		}
	};
});
