describe('matsi.services test', function() {

            beforeEach(function() {
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

            beforeEach(inject(function($cookies, $rootScope, $injector) {
                scope = $rootScope;
                $cookies.rootRef = 'https://brilliant-heat-9512.firebaseio.com/';
                FellowService = $injector.get('FellowService');
                MentorService = $injector.get('MentorService');

            }));

            it('should create a happy-fellow', function() {
                var rootRef = new Firebase('https://brilliant-heat-9512.firebaseio.com/');
                rootRef.child('users').child(mockFellow.uid).set(mockFellow, function(err) {
                });
                expect(1).toBe(1);
            });

            it('Mentor should create get mentors', function() {
                MentorService.readMentor();
                it('Fellow should update/create a fellow', function() {
                    FellowService.updateFellow(mockFellow, mockFellow.uid, function(err) {
                        expect(err).toBeUndefined();
                        expect(err).toBeDefined();
                    });
                });
            });
        });
