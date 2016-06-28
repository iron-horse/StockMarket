'use strict';

var Investor = require('../../lib/investor');
var Stock = require('../../lib/stock');
var Market = require('../../lib/market');
var expect = require('chai').expect;

var inv1 = new Investor('investor1',60000);
var inv2 = new Investor('investor2',40000);
var stock1 = new Stock('ABC',32, 4000, 2.0001, 100, 0.08);
var stock2 = new Stock('GOOG',56, 2000, 2.2002, 200, 1.08);

describe('Market', function() {
	it('should create a market', function() {
    	var market = new Market([stock1,stock2],[inv1,inv2]);
    	expect(market.stocks).to.have.lengthOf(2);
    	expect(market.investors).to.have.lengthOf(2);
    	expect(market.isOpen).to.be.false;
    	expect(market.tradingStocks).to.be.empty;
    	expect(market.stocks[0]).to.be.an.instanceof(Stock);
    	expect(market.investors[0]).to.be.an.instanceof(Investor);
	});
	it('should be able to open and close the market', function() {
		var market = new Market([stock1,stock2],[inv1,inv2]);
    	market.open();
    	expect(market.isOpen).to.be.true;
    	market.close();
    	expect(market.isOpen).to.be.false;
    	// TODO: need to check if startTrading has begun.
	});
});