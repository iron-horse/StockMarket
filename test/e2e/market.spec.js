'use strict';

var Market = require('../../lib/market');

describe('Market View', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000/#!/');
  });
  
  it('should be the market view', function() {
    expect(element(by.id('title')).getText()).toEqual('Market View');
  });

  it('should display all stocks in the market.', function() {
  	element.all(by.repeater('stock in stocks')).then(function (rows) {
  		 // TODO: if we can make this 3 to a variable so it wont fail if
       // we test again without restarting the server
       expect(rows.length).toEqual(3);

  	});
  });

});
