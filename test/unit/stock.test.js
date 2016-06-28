'use strict';
var Stock = require('../../lib/stock');
var simulateTrading = Stock.private.simulateTrading;
var expect = require('chai').expect;

describe('Stock', function() {
	it('should create a stock', function() {
		var stock = new Stock('ABC',32, 4000, 2.0001, 4000, 0.08);
		expect(stock.symbol).to.equal('ABC');
		expect(stock.price).to.equal(32);
		expect(stock.quantity).to.equal(4000);
		expect(stock.growthRate).to.equal(2.0001);
		expect(stock.changeInterval).to.equal(4000);
		expect(stock.volatilityPercent).to.equal(0.08);
    });
    it('should simulate trading', function() {
		var stock = new Stock('ABC',32, 4000, 2.0001, 4000, 0.08);
		var old_value = stock.price;
		var old_count_price = stock.tradeHistory.prices.length;
		var old_count_timestamp = stock.tradeHistory.timestamps.length;
		simulateTrading(stock);
		var new_value = stock.price;
		var new_count = stock.tradeHistory.prices.length;
		var new_count_timestamp = stock.tradeHistory.timestamps.length;
		expect(old_value).to.not.equal(new_value);
		expect(old_count_price).to.equal(new_count - 1);
		expect(old_count_timestamp).to.equal(new_count_timestamp - 1);
    });
    it('should start trading', function () {
        var stock = new Stock('ABC',32, 4000, 2.0001, 100, 0.08);
        var intervalId = stock.startTrading();
        expect(stock.isTrading).to.be.true;
        stock.stopTrading(intervalId);
    });
    it('should stop trading', function () {
        var stock = new Stock('ABC',32, 4000, 2.0001, 100, 0.08);
        var intervalId = stock.startTrading();
        stock.stopTrading(intervalId);
        expect(stock.isTrading).to.be.false;
    });
});