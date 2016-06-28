'use strict';

describe('Investor View', function() {
	
	var messageElement = element(by.id('message'));
  	
  	var stockSymbol = element(by.model('stock.symbol'));
	var stockQuantity = element(by.model('stock.quantity'));
	
	var buyButton = element(by.id('buy'));
	var sellButton = element(by.id('sell'));
	
	beforeEach(function() {
		browser.get('http://localhost:3000/#!/investor');
	});

	it('check the title for investor view', function() {
		expect(element(by.id('title')).getText()).toEqual('Investor View');
	});

	it('should display all stocks in the market.', function() {
	  	element.all(by.repeater('stock in stocks')).then(function (rows) {
	  		 expect(rows.length).toEqual(0);
		  	});
 	});

	it('should allow you to buy stock with valid input values', function() {
		expect(buyButton.isEnabled()).toBe(false);
		stockSymbol.sendKeys("GOOG");
		expect(buyButton.isEnabled()).toBe(false);
		stockQuantity.sendKeys("invalidInput");
		expect(buyButton.isEnabled()).toBe(false);
		stockQuantity.sendKeys(10);
		expect(buyButton.isEnabled()).toBe(true);
		buyButton.click().then(function () {
			expect(messageElement.getText()).toEqual('Congratulations! Transection made successfully.');
			element.all(by.repeater('stock in stocks')).then(function (rows) {
	  		 expect(rows.length).toEqual(1);
		  	});
		})
		
	});

	it('should allow you to sell stock with valid input values', function() {
		expect(sellButton.isEnabled()).toBe(false);
		stockSymbol.sendKeys("GOOG");
		expect(sellButton.isEnabled()).toBe(false);
		stockQuantity.sendKeys("invalidInput");
		expect(sellButton.isEnabled()).toBe(false);
		stockQuantity.sendKeys(10);
		expect(sellButton.isEnabled()).toBe(true);
		sellButton.click().then(function () {
			expect(messageElement.getText()).toEqual('Congratulations! Transection made successfully.');
			element.all(by.repeater('stock in stocks')).then(function (rows) {
	  		 expect(rows.length).toEqual(0);
		  	});
		})
		
	});
});
