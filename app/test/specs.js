describe('Fellow Mentor Service Test',function(){

	var FellowService, 
	MentorService, 
	MailService,
	Refs,
	mockFellow = {
		uid: 'happy-fellow-id',
		fullName: 'Happy Fellow',
		role: '-fellow-',
		email: 'happy-fellow-id@andela.co'
	},
	mockMentor = {
		uid: 'happy-mentor-id',
		role: '-mentor-',
		fullName: 'Happy Mentor',
		email: 'happy-mentor-id@andela.co'
	};

	beforeEach(function(){
		module('Matsi');
	});

	beforeEach(inject(function($injector){
		FellowService = $injector.get('FellowService');
		MentorService = $injector.get('MentorService');
		MailService = $injector.get('MailService');
		Refs = $injector.get('Refs');
		rootScope = $injector.get('$rootScope');
	}));

	beforeEach(function(done){
		Refs.rootRef.child('users').child(mockMentor.uid).set(mockMentor,function(err){
			Refs.rootRef.child('users').child(mockFellow.uid).set(mockFellow,function(err){
				done();
			});	
		});
		rootScope.currentUser = mockMentor;
	});

	describe('Mentors and Fellow Relationship',function(){
		
			it('Should have created the Fellow',function(done){
				FellowService.findOne(mockFellow.uid,function(snap){
					var fellow = snap.val();
					expect(fellow.uid).toBe(mockFellow.uid);
					done();
				});
			});

			it('Should have created the Mentor',function(done){
				MentorService.findOne(mockMentor.uid,function(snap){
					var mentor = snap.val();
					expect(mentor.uid).toBe(mockMentor.uid);
					done();
				});
			});
			it('Should get mentors',function(done){
				MentorService.all(function(snap){
					var mentors = [];
					var mentorsObject = snap.val();
					for(var i in mentorsObject)
          mentors.push(mentorsObject[i]);
       	 	expect(mentors.length).toBeGreaterThan(1);
					done();
				});
			});
			it('should update mentor successfully', function(done){
				mockMentor.lastName = 'Happy';
				console.log('ohhhh', mockMentor);
				MentorService.update(mockMentor, function(err){
					console.log("yessss", mockMentor);
					//console.log('ohhhh', mockMentor);
						// MentorService.findOne(mockMentor.uid, function(snap){
						// 	console.log('Snap',snap.val());
						// 	var mentor = snap.val();
						// expect(mentor).toBe(mockMentor);
						// done();
						// });
				expect(err).toBe(null);
				done();
				});
				
			});

	});

	afterEach(function(done){
		Refs.rootRef.child('users').child(mockMentor.uid).remove(function(err) {
				expect(err).toBe(null);
				Refs.rootRef.child('users').child(mockFellow.uid).remove(function(err){	
					expect(err).toBe(null);
					done();
				});					
		});
	});

});