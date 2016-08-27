'use strict';

(function(){
	angular.module('app.components')
	.directive('stockDetails', show);
	function show(StockService) {
		return {
			controller: stockDetailsController,
			templateUrl: 'views/stockDetails.html',
			restrict: 'E',
			scope: {
				stock: '=',
				quantity: '='
			}
		};
		function stockDetailsController($scope) {
			var self = $scope;
			self.refresh = function(sym) {
				StockService.getStock(sym).success(function(stock) {
					self.stock = stock;
					self.stock.tradeHistory.timestamps = self.stock.tradeHistory.timestamps.map(function(timestamp) {
						return new Date(timestamp);
					});
				}).error(function(data, status) {
					console.error('Repos error', status, data);
				});
			};
			self.refresh(self.stock.symbol);
		}
	}
})();

(function(){
	angular.module('app.components')
	.directive('stockGraph', showGraph);

	function showGraph(StockService, $window) {
		return {
			link: stockGraphController,
			scope: {
				prices: '=',
				timestamps: '='
			}
		};
		function stockGraphController(scope, element) {
			scope.chart = c3.generate({
				bindto: $window.d3.select(element[0]),
				data: {
					x: 'timestamp',
					columns: [
						['price'].concat(scope.prices),
						['timestamp'].concat(scope.timestamps)
					],
					xFormat: '%Y-%m-%dT%H:%M:%S.%LZ',
				},
				axis: {
					x: {
						type: 'timeseries',
						tick: {
							fit: true,
							format: '%H:%M:%S',
							count: 5
						}
					}
				},
				tooltip: {
					position: function(data, width, height, thisElement) {
			      	var containerWidth, tooltipWidth, x, y;
			      	containerWidth = document.clientWidth;
			      	tooltipWidth = document.querySelector('.c3-tooltip-container').clientWidth;
			      	x = parseInt(thisElement.getAttribute('x'));
			      	if (x + tooltipWidth > containerWidth) {
			        	x = containerWidth - tooltipWidth - 2;
			      	}
			      	y = thisElement.getAttribute('y');
			      	y = y - (height * 5);
			      	return {
			        	top: y,
			        	left: x
			      	};
			    	}
		        }
			});
			// scope.chart.zoom.enable(true);
			scope.$watch('timestamps', function() {
				scope.chart.load({columns: [
					['price'].concat(scope.prices.slice(-25)),
					['timestamp'].concat(scope.timestamps.slice(-25))
				]});
			});
			}
	}
})();

