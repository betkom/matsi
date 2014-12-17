describe ('matsi home page', function(){
  var ptor;
    beforeEach(function() {
        ptor = protractor.getInstance();
        ptor.get('http://matsi.herokuapp.com');
    });
  it('should show appropriate links', function(){
    browser.get('matsi.herokuapp.com');

    var googleSignIn = element(by.linkText('Sign in with Google'));
    var fellowsLink =  element(by.linkText('View Fellows'));
    var mentorLink = element(by.linkText('View Mentors'));
    expect(googleSignIn.getText()).toEqual('Sign in with Google');
    expect(fellowsLink.getText()).toEqual('View Fellows');
    expect(mentorsLink.getText()).toEqual('View Mentors');
  });
});