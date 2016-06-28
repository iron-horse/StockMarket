'use strict';

describe('Market default url', function() {
  it('should automatically redirect to / when location hash/fragment is empty', function() {
    browser.get('http://localhost:3000');
    expect(browser.getLocationAbsUrl()).toMatch("/");
  });
});
