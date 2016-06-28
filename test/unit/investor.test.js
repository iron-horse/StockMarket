'use strict';
var Investor = require('../../lib/investor');
var expect = require('chai').expect;

describe('Investor', function() {

    it('should create a investor', function() {
    		var inv = new Investor('test investor',60000);
    		expect(inv.name).to.equal('test investor');
    		expect(inv.capital).to.equal(60000);
    });

    it('should have name,capital and stocks properties', function() {
    		var inv = new Investor('test investor', 5000);
    		expect(inv).to.have.all.keys(['name', 'capital', 'stocks']);
    });
});