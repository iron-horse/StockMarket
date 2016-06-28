'use strict';

/* Basic building blocks for the stock market backend */
var Stock = require('./lib/stock');
var Investor = require('./lib/investor');
var Market = require('./lib/market');


function createMarket(stockType, investorGroup) {
    /* Pre-defined stock market configurations */
    var createStocks = function() {
      var ntap = new Stock('NTAP', 26.31, 4000, 1.0017, 6000, 1.03);
      var goog = new Stock('GOOG', 726.65, 5000, 0.9995, 5000, 0.46);
      var yhoo = new Stock('YHOO', 50.31, 7000, 1.0020, 3000, 1.88);
      var amzn = new Stock('AMZN', 706.31, 8000, 1.0001, 4000, 1.15);

      switch(stockType) {
        case('tech'):
          console.log('Loading Tech Stocks into the market...');
          return [ntap, goog];
        default:
          return [yhoo, amzn];
      }
    };

    var createInvestors = function() {
      var user = new Investor('User', 5);
      var dan = new Investor('Dan', 150000);
      var rich = new Investor('Rich', 475000);

      switch(investorGroup) {
        case('rich'):
          console.log('Placing Rich Investors into the market...');
          return [dan, rich];
        default:
          return [user];
      }
    };

    var stocks = createStocks();
    var investors = createInvestors();
    var myMarket = new Market(stocks, investors);

    myMarket.open(); 
    return myMarket;
}


module.exports = createMarket;