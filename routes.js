'use strict';

var Stock = require('./lib/stock');
var Investor = require('./lib/investor');

function getInvestor (market, name) {
	var noInvestor;
	var investors = market.investors;
	for(var i=0, investor; investor=investors[i];i++){
		if(investor.name === name){
			return investor;
		}
	}
	return noInvestor;
}

function getStock (market, symbol) {
	var noStock;
	var stocks = market.stocks;
	for(var i=0, stock; stock=stocks[i];i++){
		if(stock.symbol === symbol){
			return stock;
		}
	}
	return noStock;
}

function getInvestorStock(market, symbol) {
	var noStock;
	var investorStocks = market.activeInvestor.stocks;
	for(var i=0; i < investorStocks.length; i++){
		if(investorStocks[i].stock.symbol === symbol){
			return [i, investorStocks[i]];
		}
	}
	return noStock;
}

module.exports = function(app, market){

	/* Example routes - add your own routes to interact with your stock market */
	app.get('/active-investor', function (req, res) {
	  res.send(market.activeInvestor);
	  return;
	});
	//************** Investors routes starts *****************//
	app.get('/investors', function (req, res) {
		res.send(market.investors);
		return;
	});

	app.get('/investors/:name', function (req, res) {
		var investor = getInvestor(market, req.param("name"));
		if(investor !== 'undefined'){
			res.send(investor);
		}
		res.status(404).send('Not Found');
		return;
	});
	app.patch('/investors/:name/active', function (req, res) {
		var investor = getInvestor(market, req.param("name"));
		// console.log(investor);
		if(investor !== undefined){
			market.activeInvestor = investor;
			res.send("Selected investor is active investor in the market now.");
			return;
		}
		res.status(404).send('Not Found');
		return;
	});
	app.post('/investors', function (req, res) {
	  	var requestData = req.body;
	  	// create an investor
	  	var investor = new Investor(requestData.name, requestData.capital);
	  	// add investor in market
	  	market.investors.push(investor);
		res.send(investor);
		return;
	});

	app.put('/investors/:name', function (req, res) {
		//disabling updates for customer
		res.send('Not allowed to update investor');
		return;

		var requestData = req.body;
	  	var investor = getInvestor(market, req.params.name);
	  	investor.name = requestData.name;
	  	investor.capital = requestData.capital;
	  	res.send(getInvestor(market, investor.name));
	  	// return;
	}); 
	//************** Investors routes ends *****************//

	//************** Market routes starts *****************//
	app.patch('/market/:action', function (req, res) {
	  	// perform an action to the market (open/close)
	  	var message = "Unknown action."
	  	if(req.param("action") == 'open'){
	  		market.open();
	  		message = "Market successfully opened."
	  	}
	  	else if (req.param("action") ==  'close') {
	  		market.close();
	  		message = "Market successfully clsoed."
	  	}
	  	res.send(message);
	  	return;
	  
	});
	//************** Market routes ends *****************//

	//************** Stocks routes starts *****************//
	app.get('/stocks', function (req, res) {
	  	res.send(market.stocks);
	  	return;
	});

	app.get('/stocks/:symbol', function (req, res) {
	  	var stock = getStock(market, req.param("symbol"));
	  	if(stock !== undefined){
	  		res.send(stock);  
	  		return;
	  	}
	  	res.status(404).send('Not Found');
	  	return;
	});

	app.post('/stocks', function (req, res) {
	  	var requestData = req.body;
  		// create an stock
  		var stock = new Stock(requestData.symbol,
  							requestData.price,
  							requestData.quantity,
  							requestData.growthRate,
  							requestData.changeInterval,
  							requestData.volatilityPercent);
	  	// add stock in market
	  	market.stocks.push(stock);
	  	if(market.isOpen){
		  	market.tradingStocks[stock.symbol] = stock.startTrading();
		}
		res.send(stock);
		return;
	});

	app.put('/stocks/:symbol', function (req, res) {
	  	var requestData = req.body;
	  	var stock = getStock(market, req.param("symbol"));
	  	
	  	market.tradingStocks[stock.symbol] = stock.updateStock(requestData.growthRate,
														requestData.changeInterval,
														requestData.volatilityPercent,
														market.tradingStocks[stock.symbol]
													);
	  	if(market.tradingStocks[stock.symbol]){
	  		res.send("Stock updated successfully.");
	  		return;	
	  	}
		res.send("Something wrong went in updating stock.");
	  	
	});

	app.patch('/stocks/buy/:symbol', function (req, res) {
		if(!market.isOpen){
			res.send("Market is closed. Please try when its open.");
			return;
		}
		var requestData = req.body;
		
		var stockFound = getInvestorStock(market, req.param("symbol"));
		var stockIndex = -1;
		var stock;
		var totalQuantity = 0;
		if(stockFound !== undefined){
			stockIndex = stockFound[0];
		  	stock = stockFound[1].stock;
			totalQuantity = stockFound[1].quantity;
		}
		else{
			stock = getStock(market, req.param("symbol"));
		}
	  	if(stock == undefined){
	  		res.status(404).send('No stock found with given symbol.');
	  		return;
	  	}
		if(!requestData.quantity && requestData.quantity <= 0){
			res.status(400).send('Provide valid quantity of stock.');
			return;
		}
		var buyQuantity = parseInt(requestData.quantity);
	  	if(stock.quantity == 0 || (stock.quantity - buyQuantity) < 0){
	  		res.status(400).send('Quantity of stock is not enough.');
	  		return;
	  	}
	  	if(market.activeInvestor.capital - (buyQuantity * stock.price) > -1){
	  		stock.quantity = stock.quantity - buyQuantity;
	  		market.activeInvestor.capital = market.activeInvestor.capital - (buyQuantity * stock.price);
	  		
	  		if(stockIndex < 0){
	  			market.activeInvestor.stocks.push({"stock":stock, quantity: buyQuantity});
	  		}
	  		else{
	  			stockFound[1].quantity = totalQuantity + buyQuantity;
	  		}
	  		
	  		res.end("Congratulations! Transection made successfully.");
	  		return;
	  	}
	  	else{
	  		res.status(400).send('Insufficient fund.');
	  		return;
	  	}
	  	res.status(400).ensendd('Something went wrong.');
	 return
	});


	app.patch('/stocks/sell/:symbol', function (req, res) {
		if(!market.isOpen){
			res.send("Market is closed. Please try when market is its open.");
			return;
		}
		var requestData = req.body;
		var stockFound = getInvestorStock(market, req.param("symbol"));
		
		if(stockFound === undefined){
	  		res.status(404).send('You do not have that stock.');
	  		return;
	  	}
	  	var stockIndex = stockFound[0];
	  	var stock = stockFound[1].stock;
		var totalQuantity = stockFound[1].quantity;
	  	

		if(!requestData.quantity || requestData.quantity<= 0){
			res.status(400).send('Provide valid quantity of stock.');
			return;
		}
		var sellQuantity = parseInt(requestData.quantity);
	  	if((totalQuantity - sellQuantity) < 0){
	  		res.status(400).send('Quantity of stock is not valid.');
	  		return;
	  	}else{
	  		stockFound[1].quantity = totalQuantity - sellQuantity;
	  		stock.quantity = stock.quantity + sellQuantity;
	  		market.activeInvestor.capital = market.activeInvestor.capital + (sellQuantity * stock.price);
	  		if(stockFound[1].quantity == 0){
	  			market.activeInvestor.stocks.splice(stockIndex, 1);
	  		}
	  		res.end("Congratulations! Transection made successfully.");
	  		return;
	  	}
	  	res.status(400).send('Something went wrong.');
		return
	});
	//************** Stocks routes ends *****************//

};