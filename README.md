* Outline the install and run-time instructions:

Node version : 5.6.0
npm version: 2.14.7

### Install Dependencies for production

    npm install --production

### Start the production server using 

    grunt run:prod

**You may see this warnings since we are not installing dev dependancies.**

```
>> Local Npm module "grunt-mocha-test" not found. Is it installed?
>> Local Npm module "grunt-eslint" not found. Is it installed?
>> Local Npm module "grunt-protractor-runner" not found. Is it installed?
>> Local Npm module "grunt-contrib-uglify" not found. Is it installed?
>> Local Npm module "grunt-contrib-copy" not found. Is it installed?
```

### Check It Out in a Browser

Check out the running application by opening it in your web browser: [http://localhost:5000/](http://localhost:5000/)


* Description of the application
- Single page application have three different views (market view, investor view, management view)
- Each view will have one controller
    - All controllers will be in separate directory/file for separation of concerns.
- For three data models, there are three angular services ( marketService, investorService, stockService)
    - Services will interact with NodeJS server.
- For reusability and clean HTML code there are some directives. ( stockDetails, stockGraph)
- Grunt tasks to handle start the server, to run the tests and to move production code in dist directory

* Errors And TODOs
    - Known issuses
        - Error message in console about Date parsing from C3.js library
    - TODO
        - Use routers for routes
        - On server data validation is not fully covered.
        - Add more test cases for differnt scenarios.
        - Add more validation on management view while creating / editing stock and/or investors, eg. should not allow user to enter negative values. ( I have added validation for investors view though. )
        - Configure protractor to test with different browsers.


# To test the application


### Install Dependencies for dev

    npm install --dev


### For Unit Test
    
    - Start the dev server using
    
        - grunt run:dev

    - Open a new tab and run the test using 
    
        - grunt test:unit

    - Stop the server

### For e2e Test
    
    - Start the dev server using
    
        - grunt run:dev

    - Open a new tab, then update and start selenium server
    
        - webdriver-manager update
    
        - webdriver-manager start

    - Open a new tab and start the test
    
        - grunt test:e2e

    - Stop the server

