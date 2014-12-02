describe('matsi.services test',function(){
	
	beforeEach(function(){
		module('Matsi');
	});

	var FellowService,
	MentorService,
	scope;
	var mockFellow = {
			uid: 'ggoogle:117109096177371390026',
			name: 'Happy Fellow',
			email: 'happy-fellow@andela.co'
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

		it('MentorService should create mock Fellow mentorship request', function(){


		});

	});

	describe ('FellowService', function(){
		
		beforeEach(function(){

		});

		it('FellowService should update/create a fellow', function(){
			console.log('Running FellowService Update');
			FellowService.update(mockFellow,function(err){
				console.log(err,'isError2');
				expect(err).toBeUndefined();
				expect(err).toBeDefined();
			});
		});

	});
});