'use strict';

/*
 * The market is the place where investors can buy and sell stocks ONLY when the market is open.
 */

var Market = function (stocks, investors) {
  this.stocks = stocks;

  // there are multiple investors in the market
  this.investors = investors;
  
  // just one investor will be an active investor at a time
  this.activeInvestor = investors[0];
  this.isOpen = false;
  this.tradingStocks = {};
};

Market.prototype.open = function() {
  var market = this;
  this.isOpen = true;
  this.stocks.forEach(function(stock) {
    market.tradingStocks[stock.symbol] = stock.startTrading();
  });
};

Market.prototype.close = function() {
  var market = this;
  this.isOpen = false;
  this.stocks.forEach(function(stock) {
    stock.stopTrading(market.tradingStocks[stock.symbol]);
  });
};

module.exports = Market;
