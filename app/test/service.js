describe('matsi.services test',function(){
	
	beforeEach(function(){
		module('Matsi');
	});

	var FellowService,
	MentorService,
	scope;
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
		FellowService =  $injector.get('FellowService');
		MentorService = $injector.get('MentorService');

	}));
	describe ('MentorService', function(){
		
		beforeEach(function(){

		});

		it('MentorService should create get mentors', function(){
			MentorService.readMentor();

		});

	});

	describe ('FellowService', function(){
		
		beforeEach(function(){

		});

		it('FellowService should update/create a fellow', function(){
			console.log('Running FellowService Update');
			FellowService.updateFellow(mockFellow, mockFellow.uid,function(err){
				console.log(err,'isError2');
				expect(err).toBeUndefined();
				expect(err).toBeDefined();
			});
		});

	});
});