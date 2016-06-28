'use strict';

angular.module('app.services')
.factory('InvestorService', function($http) {
    return {
        getActiveInvestors: function() {
            return $http.get('/active-investor');
        },
        getAllInvestors: function() {
            return $http.get('/investors');
        },
        addInvestor: function(investor) {
            return $http.post('/investors', investor, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getInvestorInfo: function(investor) {
            return $http.get('/investors/'+investor.name);
        },
        makeInvestorActive: function(investor) {
            return $http({
                method: 'PATCH',
                url: '/investors/'+investor.name+'/active',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }	
    };
});
