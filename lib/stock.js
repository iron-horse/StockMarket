'use strict';

/*
 * The basic building blocks of the market which can be bought and sold by investors
 * at a price that changes over time based on a simulated trading function.
 */
var Stock = function (symbol, price, quantity, growthRate, changeInterval, volatilityPercent) {
  this.symbol = symbol;
  this.price = price;
  this.quantity = quantity;
  this.growthRate = growthRate;
  this.changeInterval = changeInterval;
  this.volatilityPercent = volatilityPercent;
  this.tradeHistory = {prices: [], timestamps: []};
  this.isTrading = false;
};

Stock.prototype.startTrading = function() {
  var stock = this;
  if (!this.isTrading) {
    this.isTrading = true;

    return setInterval(simulateTrading.bind(null, stock), this.changeInterval);
  }
};

Stock.prototype.stopTrading = function(trading) {
  if (this.isTrading) {
    this.isTrading = false;
    clearInterval(trading);
  }
};

Stock.prototype.updateStock  = function(growthRate, changeInterval, volatilityPercent, timerID) {
  this.growthRate=growthRate;
  this.changeInterval=changeInterval;
  this.volatilityPercent=volatilityPercent;
  this.stopTrading(timerID);

  return this.startTrading();
};

/*
 * Private method that mimics the natural change of a stock price over time by
 * a small random percentage (+/- volatilityPercent) from its current growthRate
 */
function simulateTrading(stock) {
  var randomChange = (Math.random() * stock.volatilityPercent * 2 - stock.volatilityPercent) / 100;
  stock.price = stock.price * (stock.growthRate + randomChange);
  stock.tradeHistory.prices.push(stock.price);
  stock.tradeHistory.timestamps.push(new Date());
}

exports = module.exports = Stock;

exports.private = { simulateTrading: simulateTrading};
