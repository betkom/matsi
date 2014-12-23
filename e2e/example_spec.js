describe('Matsi', function() {
    var url;
    browser.get('http://localhost:5555/');

    it('should confirm current url is equal homepage url', function() {
        url = browser.getCurrentUrl();
        expect(url).toEqual('http://localhost:5555/');
    });

    it('should return all fellows when view fellows is clicked', function(done) {
        var text = browser.findElement(By.linkText('View Fellows')).getText();
        browser.findElement(By.linkText('View Fellows')).click();
        url = browser.getCurrentUrl();
        expect(url).toEqual('http://localhost:5555/fellows');
        done();
    });

    it('should return all fellows when view fellows is clicked', function(done) {
        var text = browser.findElement(By.linkText('View Mentors')).getText();
        browser.findElement(By.linkText('View Mentors')).click();
        url = browser.getCurrentUrl();
        expect(url).toEqual('http://localhost:5555/mentors');
        done();
    });

    it('should confirm current', function(done) {
        browser.ignoreSynchronization = true;
        element(by.css('.signin-btn')).click().then(function() {
            browser.sleep(3000);
            browser.findElement(By.id('Email')).sendKeys('1testertest1@gmail.com');
            browser.findElement(By.id('Passwd')).sendKeys('p87654321');
            browser.findElement(By.id('signIn')).click().then(function() {
                browser.sleep(3000);
                done();
            });
        });
    });

    it('should have signed in', function(done) {
        url = browser.getCurrentUrl();
        expect(url).toEqual('http://localhost:5555/');
        done();
    });

    it('should goto My Profile page', function(done) {
        element(by.css('.caret')).click();
        var text = browser.findElement(By.linkText('My Profile')).getText();
        browser.findElement(By.linkText('My Profile')).click();
        url = browser.getCurrentUrl();
        expect(text).toEqual('My Profile');
        expect(url).toEqual('http://localhost:5555/mentors/google:101564428049337718784');
        done();
    });

    it('Should navigate to edit profile', function(done) {
        element(by.css('.caret')).click();
        var text = browser.findElement(By.linkText('Edit Profile')).getText();
        browser.findElement(By.linkText('Edit Profile')).click();
        url = browser.getCurrentUrl();
        expect(text).toEqual('Edit Profile');
        expect(url).toEqual('http://localhost:5555/mentors/google:101564428049337718784/edit');
        done();
    });

    it('should logout', function(done) {
      element(by.css('.caret')).click();
      var text = browser.findElement(By.linkText('Logout')).getText();
      browser.findElement(By.linkText('Logout')).click();
      url = browser.getCurrentUrl();
      expect(text).toEqual('Logout');
      expect(url).toEqual('http://localhost:5555/');
      done();
    })
});
