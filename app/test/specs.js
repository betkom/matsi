describe('Fellow Mentor Service Test', function() {

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

    beforeEach(function() {
        module('Matsi');
    });

    beforeEach(inject(function($injector) {
        FellowService = $injector.get('FellowService');
        MentorService = $injector.get('MentorService');
        MailService = $injector.get('MailService');
        Refs = $injector.get('Refs');
    }));

    beforeEach(function(done) {
        Refs.rootRef.child('users').child(mockMentor.uid).set(mockMentor, function(err) {
            Refs.rootRef.child('users').child(mockFellow.uid).set(mockFellow, function(err) {
                done();
            });
        });
    });

    describe('Mentors and Fellow Relationship', function() {

        it('Should have created the Fellow', function(done) {
            FellowService.findOne(mockFellow.uid, function(snap) {
                var fellow = snap.val();
                expect(fellow.uid).toBe(mockFellow.uid);
                done();
            });
        });

        // it('should update mockFellow', function(done) {
        // 	mockFellow.name = 'This is a Mock Name';
        //     FellowService.update(mockFellow,function(snap){
        //     	var fellow = snap.val();
        //     	expect(mockFellow.name).toBe(fellow.name);
        //     	done();
        //     });
        // });

        it('Should have created the Mentor', function(done) {
            MentorService.findOne(mockMentor.uid, function(snap) {
                var mentor = snap.val();
                expect(mentor.uid).toBe(mockMentor.uid);
                done();
            });
        });

    });



    afterEach(function(done) {
        Refs.rootRef.child('users').child(mockMentor.uid).remove(function(err) {
            expect(err).toBe(null);
            Refs.rootRef.child('users').child(mockFellow.uid).remove(function(err) {
                expect(err).toBe(null);
                done();
            });
        });
    });

});
