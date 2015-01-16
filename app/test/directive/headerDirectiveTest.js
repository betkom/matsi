describe('matsi.directive test', function(){
	var scope,
	Refs,
	Mentor,
  user,
  authData,
	Fellow;
  beforeEach(module('Matsi'));
  beforeEach(inject(function($controller, $rootScope, $injector, $cookies){
  	scope = $rootScope;
  	ctrl = $controller('HeaderCtrl', {
            $scope: scope
    });
  	Mentor = $injector.get('Mentor');
  	Fellow = $injector.get('Fellow');
  	Refs = $injector.get('Refs');

  }));
  
  it('should sign in a user', function(){
  	 	scope.currentUser = null;
     	scope.allowUser = false;
  	 	authData = {
  			uid: 'google:115929039247026465294',
  			fullName: 'Olusola Adenekan',
  			email: 'preciousdamsel2003@gmail.com',
  			accessToken: 'ya29.9QDBzVn8n9vh2RSyn0rifQ6erNcQFyl-seP8ddm_pabzwlNJ6klwkQcM0cYJE2_Ku5IMcz10TQ0MuA'
  		};
  		scope.auth();
  		expect(scope.currentUser).toBeDefined();
      scope.logout();
      expect(scope.currentUser).toBe(null);
  });

});
