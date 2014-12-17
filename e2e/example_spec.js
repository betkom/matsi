describe('Matsi', function() {
    // var ptor;
    //  ptor = protractor.getInstance();
    browser.get('http://localhost:5555/');
    it('should confirm current url is equal homepage url', function() {
        var homepageUrl = browser.getCurrentUrl();
        expect(homepageUrl).toEqual('http://localhost:5555/');
    });

    beforeEach(function(done) {
        element(by.css('.signin-btn')).click();
        browser.wait(function() {
            browser.getCurrentUrl().then(function() {
                var redirect = arguments;
                console.log(arguments,'arguments');
                // expect(redirect).toMatch('/*account.google.com*/');
                expect(redirect).toBeDefined();
                // done();
            });
        }).then(done);

    });
});
