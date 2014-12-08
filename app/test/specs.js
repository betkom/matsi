describe('Testing 001', function(){
	var FellowService,
		scope,
		MentorService,
		$httpBackend,
		$stateParams,
		$location;
	beforeEach(module("Matsi"));
	beforeEach(inject(function($injector, $controller, $rootScope, $cookies, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			$cookies.rootRef = 'https://brilliant-heat-9512.firebaseio.com/';
			scope = $rootScope;
			// Point global var
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			//$location = _$location_;
			FellowService = $injector.get('FellowService');
			MentorService = $injector.get('MentorService');
		}));
	it('should return all fellows as object', function(){
		var fellowData = FellowService.readFellow();
		expect(fellowData.$id).toBeDefined();
		expect(typeof fellowData).toEqual('object');
	});

	it("should return current user profile",function(){
		var uid = "google:100424084914655768945";
		var data = FellowService.readSingleFellow(uid);
		console.log(data);
		expect(data.$id).toEqual(uid);
	});

	it('Should update fellow', function(){
		var data = {};
		data.uid = "google:100424084914655768945";
		FellowService.updateFellow(data,onComplete);
		function onComplete(err){
			if(err){
				console.log("this is err",err);
				return false;
			}
			else{
				return true;
			}
		}
		expect(onComplete).toBeTruthy();
	});

	it('should return all mentors as object', function(){
		var mentorData = MentorService.readMentor();
		expect(mentorData.$id).toBeDefined();
		expect(typeof mentorData).toEqual('object');
	});
	
	// var mentor = {
	// 	name: 'kenny',
	// 	email: 'kenny@yahoo.com',
	// 	uid: '872862926098'
	// };

	// it('should update a mentor', function(){
	// 	MentorService.updateMentor(mentor, mentor.uid);
	// 	expect(mentor.name).not.toBeUndefined();
	// 	expect(mentor.name).toEqual('kenny');
	// 	expect(mentor.email).toMatch(/*.\@\.*/);
	// });
});