'use strict';

describe('Management View', function() {
	var messageElement = element(by.id('message'));
  	var addInvestorButton = element(by.id('addInvestor'));
	var investorName = element(by.model('investor.name'));
	var investorCapital = element(by.model('investor.capital'));
	
	var stockSymbol = element(by.model('stock.symbol'));
	var stockPrice = element(by.model('stock.price'));
	var stockQuantity = element(by.model('stock.quantity'));
	var stockGrowthRate = element(by.model('stock.growthRate'));
	var stockChangeInterval = element(by.model('stock.changeInterval'));
	var stockVolatilityPercent = element(by.model('stock.volatilityPercent'));

  	var addStockButton = element(by.id('addStock'));

	beforeEach(function() {
		browser.get('http://localhost:3000/#!/management');
	});

	it('check the title for management view', function() {
		expect(element(by.id('title')).getText()).toEqual('Management View');
	});

	it('should list all of your stocks', function() {
		element(by.id('open')).click();
		expect(messageElement.getText()).toEqual('Market successfully opened.');
		element(by.id('close')).click();
		expect(messageElement.getText()).toEqual('Market successfully clsoed.');
		element(by.id('open')).click();

	});

	it('should allow you to add investor with valid input values and add to the list', function() {
		expect(addInvestorButton.isEnabled()).toBe(false);
		investorName.sendKeys("investor1");
		expect(addInvestorButton.isEnabled()).toBe(false);
		investorCapital.sendKeys("invalidInput");
		expect(addInvestorButton.isEnabled()).toBe(false);
		investorCapital.sendKeys(10000);
		expect(addInvestorButton.isEnabled()).toBe(true);
		var old_number;
		element.all(by.repeater('investor in investors')).then(function (rows) {
  			 old_number = rows.length;
	  	});
		addInvestorButton.click().then(function () {
			expect(messageElement.getText()).toEqual('Investor added successfully.');
			element.all(by.repeater('investor in investors')).then(function (rows) {
			 expect(rows.length).toEqual(old_number + 1);
		  	});
		})

	});

	it('should allow you to add stock with valid input values and add to the list', function() {
		
		expect(addStockButton.isEnabled()).toBe(false);
		stockSymbol.sendKeys("TEST");
		expect(addStockButton.isEnabled()).toBe(false);
		stockPrice.sendKeys(30.99993);
		expect(addStockButton.isEnabled()).toBe(false);
		stockQuantity.sendKeys(3000);
		expect(addStockButton.isEnabled()).toBe(false);
		stockGrowthRate.sendKeys(1.30);
		expect(addStockButton.isEnabled()).toBe(false);
		stockChangeInterval.sendKeys(3000);
		expect(addStockButton.isEnabled()).toBe(false);
		stockVolatilityPercent.sendKeys(1.04);
		expect(addStockButton.isEnabled()).toBe(true);
		var old_number;
		element.all(by.repeater('stock in stocks')).then(function (rows) {
  			 old_number = rows.length;
	  	});
		addStockButton.click().then(function (){
			expect(messageElement.getText()).toEqual('Stock added successfully.');
			element.all(by.repeater('stock in stocks')).then(function (rows) {
	  		 expect(rows.length).toEqual(old_number + 1);
		  	});
		});

	});
});
