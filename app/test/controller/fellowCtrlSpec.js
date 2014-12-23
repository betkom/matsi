describe('matsi.controller test', function(){
	
	var scope,
		ctrl;
	beforeEach(module('Matsi'));
	  beforeEach(inject(function($controller, $rootScope, $cookies) {
	      scope = $rootScope;
	      ctrl = $controller('FellowCtrl', {
	          $scope: scope
	      });
	      $cookies.rootRef = 'https://brilliant-heat-9512.firebaseio.com/';
	  }));
	  

	it('should expect showMessageBox to be false', function(){
		scope.showMessageBox = true;
		scope.showBox();
		expect(scope.showMessageBox).toBeFalsy();
	});
});