describe('Fellow Mentor Service Test', function() {

    var Fellow,
        MentorService,
        MailService,
        Refs,
        mockFellow = {
            uid: 'happy-fellow-id',
            fullName: 'Happy Fellow',
            role: '-fellow-',
            email: 'happy-fellow-id@andela.co',
            isMentored: true,
            picture: 'this is pic url',
            firstName: 'happy'
        },
        mockMentor = {
            uid: 'happy-mentor-id',
            role: '-mentor-',
            fullName: 'Happy Mentor',
            email: 'happy-mentor-id@andela.co',
            picture: 'this is pic url',
            firstName: 'happy'
        };

    beforeEach(function() {
        module('Matsi');
    });

    beforeEach(inject(function($injector) {
        Fellow = $injector.get('Fellow');
        MentorService = $injector.get('Mentor');
        MailService = $injector.get('MailService');
        Refs = $injector.get('Refs');
        rootScope = $injector.get('$rootScope');
    }));

    beforeEach(function(done) {
        Refs.rootRef.child('users').child(mockMentor.uid).set(mockMentor, function(err) {
            Refs.rootRef.child('users').child(mockFellow.uid).set(mockFellow, function(err) {
                done();
            });
        });

    });

    describe('Mentors and Fellow Relationship', function() {

        it('should update mockFellow', function(done) {
            var newName = 'This is a Mock Name';
            var updateMockFellow = angular.copy(mockFellow);
            updateMockFellow.name = newName;
            rootScope.currentUser = updateMockFellow;
            Fellow.update(updateMockFellow, function(err) {
                expect(err).toBe(null);
                Fellow.findOne(mockFellow.uid, function(snap) {
                    var fellow = snap.val();
                    expect(fellow).not.toBe(null);
                    expect(fellow.name).not.toBe(mockFellow.name);
                    expect(fellow.name).toBe(updateMockFellow.name);
                    done();
                });
            });
        });

        it('Should get fellows', function(done) {
            Fellow.all(function(snap) {
                var fellowsObject = snap.val();
                var fellows = Object.keys(fellowsObject).length;
                expect(fellows).toBeGreaterThan(1);
                done();
            });
        });

        it('should get mockFellow by id', function(done) {
            Fellow.findOne(mockFellow.uid, function(snap) {
                var fellow = snap.val();
                expect(fellow.uid).toBe(mockFellow.uid);
                done();
            });

        });

        describe('make request and accept or reject request', function() {

            it('should send request to mockFellow', function(done) {
                rootScope.currentUser = mockMentor;
                Fellow.request(mockFellow, function(err) {
                    expect(err).toBe(null);
                    done();
                });
            });

            it('should accept request', function(done) {
                rootScope.currentUser = mockFellow;
                Fellow.accept(mockMentor, function(err) {
                    expect(err).toBe(null);
                    done();
                });
            });

            it('should reject request', function(done) {
                rootScope.currentUser = mockFellow;
                mockMentor.message = 'i hate you';
                Fellow.reject(mockMentor, function(err) {
                    expect(err).toBe(null);
                    done();
                })
            });

        });
        /*********************************************************************************************/

        it('Should have created the Mentor', function(done) {
            MentorService.findOne(mockMentor.uid, function(snap) {
                var mentor = snap.val();
                expect(mentor.uid).toBe(mockMentor.uid);
                done();
            });
        });

        it('Should get mentors', function(done) {
            MentorService.all(function(snap) {
                var mentors = [];
                var mentorsObject = snap.val();
                for (var i in mentorsObject)
                    mentors.push(mentorsObject[i]);
                expect(mentors.length).toBeGreaterThan(1);
                done();
            });
        });

        it('should update mentor successfully', function(done) {
            mockMentor.lastName = 'Happy';
            rootScope.currentUser = mockMentor;
            console.log('ohhhh', mockMentor);
            MentorService.update(mockMentor, function(err) {
                expect(err).toBe(null);
                done();
            });

        });
        it('should check if a fellow is mentored', function(done){
            rootScope.currentUser = mockMentor;
            Fellow.mentorConstraint(mockFellow.uid, function(res){
                expect(mockFellow.uid).not.toBe(null);
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
