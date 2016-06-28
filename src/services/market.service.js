'use strict';

angular.module('app.services')
.factory('MarketService', function($http) {
	return {
		takeAction: function(action) {
			return $http({
				method: 'PATCH',
				url: '/market/' + action,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	};
});
