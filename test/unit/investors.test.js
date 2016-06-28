var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');
api = supertest('http://localhost:3000');

describe('Investors', function () {
	it('should get a response with active-investor.', function (done) {
		 api.get('/active-investor')
		 .set('Accept', 'application/json')
		 .end(function (err, res) {
		 	 expect(res.body).to.have.property("name");
		 	 done();
		 });
	});

	it('should get a response with list of investors.', function (done) {
		 api.get('/investors')
		 .set('Accept', 'application/json')
		 .end(function (err, res) {
		 	 expect(res.body).to.have.lengthOf(2);
		 	 done();
		 })
	}); 

	it('should get a response with details of an investor.', function (done) {
		 api.get('/investors/Dan')
		 .set('Accept', 'application/json')
		 .end(function (err, res) {
		 	 expect(res.body.name).to.equals("Dan");
		 	 done();
		 });
	});

	it('should make an ivestor an active investor and return a 200 response with a message.', function (done) {
		 api.patch('/investors/Rich/active')
		 .set('Accept', 'application/json')
		 .end(function (err, res) {
		 	 expect(res.text).to.equals("Selected investor is active investor in the market now.");
		 	 done();
		 })
	});

});