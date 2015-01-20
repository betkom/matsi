describe('Fellow Mentor Services Test', function() {
    var Fellow,
        Mentor,
        Log,
        httpBackend,
        MailService,
        Refs,
        mockFellow = {
            uid: 'google:happy-fellow-uid',
            fullName: 'Happy Fellow',
            role: '-fellow-',
            email: 'happy-fellow-uid@andela.co',
            isMentored: true,
            picture: 'this is pic url',
            firstName: 'happy'
        },
        mockMentor = {
            uid: 'google:happy-mentor-uid',
            role: '-mentor-',
            fullName: 'Happy Mentor',
            email: 'happy-mentor-uid@andela.co',
            picture: 'this is pic url',
            firstName: 'happy'
        },
        date = moment(1421678722532).format('YYYY-MM-DD');
    beforeEach(function() {
        module('Matsi');
    });
    beforeEach(inject(function($injector,$httpBackend) {
        Fellow = $injector.get('Fellow');
        Mentor = $injector.get('Mentor');
        Log = $injector.get('Log');
        MailService = $injector.get('MailService');
        Refs = $injector.get('Refs');
        rootScope = $injector.get('$rootScope');
        httpBackend = $httpBackend;
    }));
    beforeEach(function(done) {
        Refs.rootRef.child('users').child(mockMentor.uid).set(mockMentor, function(err) {
            Refs.rootRef.child('users').child(mockFellow.uid).set(mockFellow, function(err) {
                done();
            });
        });
    });
    /********************************
            LOG SERVICE TEST
    ********************************/
    describe('Activity log', function() {
        it('Should get log', function(done) {
            Log.allLogs(date, function(snap) {
                var logsObject = snap.val();
                var logs = Object.keys(logsObject).length;
                expect(logs).toBeGreaterThan(0);
                done();
            });
        });
        it('should get mentored fellows', function(done){
            Log.allMentored(function(snap){
            var mentors = snap.val();
            var mentorLog = Object.keys(mentors).length;
            expect(mentorLog).toBeGreaterThan(0);
            done();
            });
        });
         it('should get unmentored fellows', function(done){
            Log.allUnMentored(function(snap){
            var mentors = snap.val();
            var mentorLog = Object.keys(mentors).length;
            expect(mentorLog).toBeGreaterThan(0);
            done();
            });
        });
    });

      /********************************
            FELLOW SERVICE TEST
      ********************************/
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
                    Fellow.findOne(mockFellow.uid, function(snap) {
                        var fellow = snap.val().requests;
                        fellow = Object.keys(fellow).length;
                        expect(fellow).toBeGreaterThan(0);
                        Mentor.findOne(rootScope.currentUser.uid, function(snap) {
                            var mentor = snap.val().sentRequests;
                            mentor = Object.keys(mentor).length;
                            expect(mentor).toBeGreaterThan(0);
                            done();
                        });
                    });
                });
            });

            it('should accept request', function(done) {
                rootScope.currentUser = mockFellow;
                Fellow.accept(mockMentor, function(err) {
                    expect(err).toBe(null);
                    Mentor.findOne(mockMentor.uid, function(snap) {
                        var mentor = snap.val().fellows;
                        mentor = Object.keys(mentor).length;
                        expect(mentor).toBeGreaterThan(0);
                        Fellow.findOne(rootScope.currentUser.uid, function(snap) {
                            var fellow = snap.val().mentors;
                            fellow = Object.keys(fellow).length;
                            expect(fellow).toBeGreaterThan(0);
                            done();
                        });
                    });
                });
            });

            it('should reject request', function(done) {
                rootScope.currentUser = mockFellow;
                Fellow.reject(mockMentor);
                Fellow.findOne(rootScope.currentUser.uid, function(snap) {
                    var fellow = snap.val().requests;
                    expect(fellow).toBeUndefined();
                    Mentor.findOne(mockMentor.uid, function(snap) {
                        var mentor = snap.val().sentRequests;
                        expect(mentor).toBeUndefined();
                        done();
                    });
                });
            });
        });
        // /***********************************************
        //                   MENTORS SERVICE TEST
        // **********************************************/
        it('Should get mentors', function(done) {
            Mentor.all(function(snap) {
                var mentors = [];
                var mentorsObject = snap.val();
                for (var i in mentorsObject)
                    mentors.push(mentorsObject[i]);
                expect(mentors.length).toBeGreaterThan(1);
                done();
            });
        });

        it('should update mentor successfully', function(done) {
            var lastName = 'Happy';
            var updateMockMentor = angular.copy(mockMentor);
            updateMockMentor.lastName = lastName;
            rootScope.currentUser = updateMockMentor;
            Mentor.update(updateMockMentor, function(err) {
                expect(err).toBe(null);
                Mentor.findOne(mockMentor.uid, function(snap) {
                    var mentor = snap.val();
                    expect(mentor).not.toBe(null);
                    expect(mentor.lastName).toBe(updateMockMentor.lastName);
                    expect(mentor.lastName).not.toBe(mockMentor.lastName);
                    done();
                });
            });

        });
        it('should check if a fellow is mentored', function(done) {
            rootScope.currentUser = mockMentor;
            Fellow.mentorConstraint(mockFellow.uid, function(res) {
                expect(mockFellow.uid).not.toBe(null);
                done();
            });
        });
        it('should get all disabled mentors', function(done){
            Mentor.disabled(function(snap){
                var mentors = [];
                var mentorsObject = snap.val();
                expect(mentorsObject).toBeDefined();
                done();
            });
        });
        it('should enable mentors', function(done){
            Mentor.enable(mockMentor, function(err){
                Mentor.findOne(mockMentor.uid, function(snap){
                    var mentor = snap.val();
                    done();
                     expect(mentor.disabled).toBeFalsy();
                });
            });
        });
        it('should test backend post', function() {
            var data = {
              uid: 'uid',
              badges: 'badges'
            };
              httpBackend.expectPOST('/smarterer/code', {code: '23453242s323s423'}).respond(200,{yeet:'yeet'});
              Fellow.backEndPost('/smarterer/code', {code: '23453242s323s423'}, function(res){
                expect(typeof res).toBe(typeof {});
                expect(res.yeet).toBeDefined();
                expect(res.err).toBeUndefined();
              });
              httpBackend.flush();   
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
