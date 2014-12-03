describe('matsi.services test',function(){
	
	beforeEach(function(){
		module('Matsi');
	});

	var FellowService,
	MentorService,
	scope,
	cookies;
	var mockFellow = {

			uid: 'google:117109096177371390026',
			name: 'Happy Fellow',
			email: 'happy-fellow@andela.co'
		};
	var mockMentor = {
		uid: 'google:1123545666666666666',
		name: 'Happy Mentor',
		email: 'happy-fellow@gmail.com'
	};	

	beforeEach(inject(function($cookies,$rootScope, $injector){

		scope = $rootScope;
		$cookies.rootRef = 'https://brilliant-heat-9512.firebaseio.com/';
		//cookies = $cookies;
		FellowService =  $injector.get('FellowService');
		MentorService = $injector.get('MentorService');

	}));

	it('should create a happy-fellow', function(){
			
			var rootRef = new Firebase('https://brilliant-heat-9512.firebaseio.com/');
			console.log('creating happy-fellow');
			rootRef.child('users').child(mockFellow.uid).set(mockFellow,function(err){
				console.log('mockFellow created',err,'err');
			});	
			expect(1).toBe(1);
	});

	// describe ('MentorService', function(){
		
	// 	beforeEach(function(){
	// 		scope.curruentUser = mockMentor;
	// 	});

	// 	// it('MentorService should create mock Fellow mentorship request', function(){

		it('MentorService should create get mentors', function(){
			MentorService.readMentor();

	// });

	// describe ('FellowService', function(){	

	// 	beforeEach(function(){
			
	// 		scope.currentUser = mockFellow;
	// 	});

		

		it('FellowService should update/create a fellow', function(){
			console.log('Running FellowService Update');
			FellowService.updateFellow(mockFellow, mockFellow.uid,function(err){
				console.log(err,'isError2');
				expect(err).toBeUndefined();
				expect(err).toBeDefined();
			});
		});
	// });
});