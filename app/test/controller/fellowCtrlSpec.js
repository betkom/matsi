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
	  

	it('should expect end to be 4', function(){
		scope.showMessageBox = true;
		scope.showBox();
		expect(scope.showMessageBox).toBeFalsy();
	});

	// it('should post data to backeend', function(){
	// 	var param = {
 //                    email: $scope.fellow.plumEmail,
 //                    fname: $scope.fellow.firstName,
 //                    lname: $scope.fellow.lastName
 //                };
	// 	scope.plum();
	// 	expect(Fellow.update).toHaveBeenCalled();
	//});
});