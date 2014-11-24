describe('Testing 001', function(){
	var FellowService,
		scope,
		$httpBackend,
		$stateParams,
		$location;
	beforeEach(module("Matsi"));
	beforeEach(inject(function($injector, $controller, $rootScope, $cookies, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			$cookies.rootRef = 'https://brilliant-heat-9512.firebaseio.com/';
			
			scope = $rootScope;
			// Point global var

			iables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			//$location = _$location_;
			FellowService = $injector.get('FellowService');
			// Initialize the Patients controller.
			// FellowService = $controller('FellowService', {
			// 	$scope: scope
			// });
		}));
	it('should be equal', function(){
			var data = FellowService.readFellow();
			console.log(data);
			// console.log(FellowService.readFellow());
		expect(typeof data).toEqual("object");
	});
});