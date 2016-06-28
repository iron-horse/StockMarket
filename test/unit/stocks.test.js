var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');
api = supertest('http://localhost:3000');

describe('Stocks', function () {
	it('should get a response with list of stocks.', function (done) {
		 api.get('/stocks')
		 .set('Accept', 'application/json')
		 .end(function (err, res) {
		 	 expect(res.body).to.have.lengthOf(2);
		 	 done();
		 })
	}); 

	it('should get a response with details of the stock.', function (done) {
		 api.get('/stocks/GOOG')
		 .set('Accept', 'application/json')
		 .end(function (err, res) {
		 	 expect(res.body.symbol).to.equals("GOOG");
		 	 done();
		 });
	});

	it('should be able to update the stock.', function (done) {
		 api.put('/stocks/GOOG')
		 .set('Accept', 'application/json')
		 .send({ "growthRate": 1.0017,
                "changeInterval": 1000,
                "volatilityPercent": 1.03
		  })
		 .end(function (err, res) {
		 	 expect(res.text).to.equals("Stock updated successfully.");
		 	 done();
		 });
	});
	it('should be able to buy the stock.', function (done) {
	api.patch('/stocks/buy/NTAP')
		 .set('Accept', 'application/json')
		 .send({ "quantity": 200 })
		 .end(function (err, res) {
		 	 expect(res.text).to.equals("Congratulations! Transection made successfully.");
		 	 done();
		});
		 
	});
	it('should be able to buy the stock.', function (done) {
	api.patch('/stocks/buy/GOOG')
		 .set('Accept', 'application/json')
		 .send({ "quantity": 200 })
		 .end(function (err, res) {
		 	 expect(res.text).to.equals("Congratulations! Transection made successfully.");
		 	 done();
		});
		 
	});
	it('should be able to sell the stock.', function (done) {
		api.patch('/stocks/sell/NTAP')
		 .set('Accept', 'application/json')
		 .send({ "quantity": 200 })
		 .end(function (err, res) {
		 	 expect(res.text).to.equals("Congratulations! Transection made successfully.");
		 	 done();
		});
	});
	it('should be able to restrict user from giving invalid quantity.', function (done) {
		api.patch('/stocks/sell/GOOG')
		 .set('Accept', 'application/json')
		 .send({ "quantity": -300 })
		 .end(function (err, res) {
		 	 expect(res.text).to.equals("Provide valid quantity of stock.");
		 	 done();
		});
	});

});