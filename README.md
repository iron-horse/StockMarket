# Stock Market Single Page Application

You can see all listed markets stocks on market view.
You can create/edit investors and stocks, open/close the market from management view.
You can buy/sell stocks when market is open from investor view.

**Note:** Only one investor can be active at a time. You can manage active investor from management view.

* Errors And TODOs
    - Known issuses
        - Error message in console about Date parsing from C3.js library
    - TODO
        - Use routers for routes
        - On server data validation is not fully covered.
        - Add more test cases for differnt scenarios.
        - Add more validation on management view while creating / editing stock and/or investors, eg. should not allow user to enter negative values.
        - Configure protractor to test with different browsers.

### Outline the install and run-time instructions:

Node version : `5.6.0`
npm version: `2.14.7`

### Install Dependencies

    npm cache clean -g
    npm cache clean
    npm install

### Start the production server using 

    grunt run:prod


### Check It Out in a Browser

Check out the running application by opening it in your web browser: [http://localhost:5000/](http://localhost:5000/)




# To test the application

### For Unit Test
    
    - Restart the dev server using
    
        - grunt run:dev

    - Open a new tab and run the test using 
    
        - grunt test:unit

    - Stop the server

### For e2e Test
    
    - Restart the dev server using
    
        - grunt run:dev

    - Open a new tab, then update and start selenium server
    
        - webdriver-manager update
    
        - webdriver-manager start

    - Open a new tab and start the test
    
        - grunt test:e2e

    - Stop the server

