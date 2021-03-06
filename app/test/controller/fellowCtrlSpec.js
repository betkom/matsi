describe('matsi.controller test', function() {
    var scope,
        stateParams,
        Fellow,
        Log,
        MailService,
        rootScope,
        Levels,
        User,
        ctrl,
        $location,
        $httpBackend;
        //timeout;
    beforeEach(module('Matsi'));
    beforeEach(inject(function($controller, $rootScope, $cookies, $injector, $timeout) {
        $httpBackend = $injector.get('$httpBackend');
        scope = $rootScope.$new();
        Fellow = $injector.get('Fellow');
        Log = $injector.get('Log');
        MailService = $injector.get('MailService');
        stateParams = $injector.get('$stateParams');
        rootScope = $injector.get('$rootScope');
        Levels = $injector.get('Levels');
        User = $injector.get('User');
        $location = $injector.get('$location');
         rootScope.currentUser = {
                    uid: 'uid',
                    fullName: 'Happy fellow'
                };
        ctrl = $controller('FellowCtrl', {
            $scope: scope,
            $rootScope: scope
        });
        timeout = $timeout(5000);
        $cookies.rootRef = 'https://brilliant-heat-9512.firebaseio.com/';
    }));
    // beforeEach(inject(function(){

    // }));

    describe('init', function(){
        describe('when URL contains a code', function() {
            it('should call backecnd post', function(){
             
                $httpBackend.expect('POST', '/smarterer/code/').respond({});
                $httpBackend.expect('GET', 'pages/home.html').respond({});
                spyOn($location, 'absUrl').and.returnValue('fellows/?code=12345'); 
                spyOn(Fellow, 'update');
                spyOn(Log, 'save');
                scope.init();
                $httpBackend.flush();
                expect(Fellow.update).toHaveBeenCalled();
                expect(Log.save).toHaveBeenCalled();
            });

        });
        describe('when URL does not contain a code', function() {
            it('should not call backecnd post', function(){
                spyOn($location, 'absUrl').and.returnValue('fellows/12345');
                spyOn(Fellow, 'backEndPost');
                scope.init();
                expect(Fellow.backEndPost).not.toHaveBeenCalled();

            });
        });
    });

    // describe('all fellows', function(){
    //   it('should get fellow', function(){
    //     spyOn(User, 'find');
    //     timeout(function(){
    //         scope.find().then(function(){

    //         });
    //     });
    //     expect(scope.fellow).toBeDefined();
    //   });
    // });

    it('should expect backEndPost to have been called', function() {
        scope.fellow = {
          uid: 'google:244563632',
          plumEmail: 'this is plumEmail',
          firstName:'this is fname',
          lastName: 'this is lname',
          fullName: 'happy fellow'
        };
        $httpBackend.expect('POST', '/plum/api/').respond({
          candidates: [
            fellow = {
              badges: ''
            }
          ]
        });
        $httpBackend.expect('GET', 'pages/home.html').respond({});
        spyOn(Fellow, 'update');
        scope.plum();
        $httpBackend.flush();
        expect(Fellow.update).toHaveBeenCalled();
    });
    it('should clear the date', function() {
        scope.dt = '2014-01-03';
        scope.clear();
        expect(scope.dt).toBe(null);
    });
    it('should paginate on shuffle', function() {
        var start = 0,
            end = 0,
            currentPage = 0,
            numPerPage = 2,
            fellowsOnpage = [
                scope.fellow1 = {},
                scope.fellow2 = {}
            ],
            lastIndexOfFellows = 0;
        scope.fellowsFilter();
        expect(scope.fellows.length).toBe(0);
    });
    it('should call filter', function(){
        var start = 0,
                end = 0,
                currentPage = 1,
                numPerPage = 2,
                fellowsOnpage = [
                scope.fellow1 = {},
                scope.fellow2 = {}
                ],
                lastIndexOfFellows = 0;
                spyOn(scope, 'fellowsFilter');
                scope.shuffle();
                expect(scope.fellowsFilter).toBeDefined();

    });
    it('should get current Page', function(){
        var page = 1;
        scope.navigate(page);
        expect(scope.currentPage).toBe(1);
    });
    it('should expect findOne to have been called', function() {
        scope.currentUser = {
            uid: 'uid'
        };
        spyOn(User, 'find');
        scope.find();
        expect(User.find).toHaveBeenCalled();
    });

    it('should expect update to have been called', function() {
        scope.uploadedResult = 'https://kehesjay.s3-us-west-2.amazonaws.com/People';
        scope.videoUrl = scope.uploadedResult;
        scope.fellow = {
            uid: 'uid',
            videoUrl: 'yyyyyyy',
            fullName: 'fellow',
            firstName: 'gdghdghgd',
            lastName: 'dgghghggs',
            plumEmail: 'gghhh@sola.com'
        };
        scope.currentUser = {
            uid: 'uid'
        };
        scope.plumCheck = true;
        spyOn(Fellow, 'update');
        spyOn(Log, 'save');
        scope.update();
        expect(Fellow.update).toHaveBeenCalled();
        expect(Log.save).toHaveBeenCalled();

    });

    it('should expect mentorConstraints to have been called', function() {
        stateParams.uid = 'uid';
        spyOn(Fellow, 'mentorConstraint');
        scope.mentorConstraints();
        expect(Fellow.mentorConstraint).toHaveBeenCalled();
    });

    it('should expect delete to have been called', function() {
        var fellowId = 'uid';
        spyOn(Fellow, 'delete');
        scope.delete(fellowId);
        expect(Fellow.delete).toHaveBeenCalled();
    });
    it('should expect scope. levels to be defined', function(){
        expect(scope.levels).toBeDefined();
    });

    it('should expect sendRequest to have been called', function() {
        scope.fellow = {
            fullName: 'Happy Fellow'
        };
        spyOn(Fellow, 'request');
        spyOn(MailService, 'send');
        spyOn(Log, 'save');
        scope.sendRequest();
        expect(Fellow.request).toHaveBeenCalled();
        expect(MailService.send).toHaveBeenCalled();
        expect(Log.save).toHaveBeenCalled();
    });

    it('should expect all to have been called', function() {
        spyOn(Fellow, 'all');
        scope.all();
        expect(Fellow.all).toHaveBeenCalled();
    });

    it('should expect end to be 4', function() {
        scope.showMessageBox = true;
        scope.showBox();
        expect(scope.showMessageBox).toBeFalsy();
    });

    it('should expect allLogs to have been called', function() {
        var date = 1420634388603;
        spyOn(Log, 'allLogs');
        scope.allLogs();
        expect(Log.allLogs).toHaveBeenCalled();
        scope.allLogs(date);
        expect(Log.allLogs).toHaveBeenCalled();

    });

    it('should expect allMentored to have been called', function() {
        spyOn(Log, 'allMentored');
        scope.allMentored();
        expect(Log.allMentored).toHaveBeenCalled();
    });

    it('should expect allunMentored to have been called', function() {
        spyOn(Log, 'allUnMentored');
        scope.allUnMentored();
        expect(Log.allUnMentored).toHaveBeenCalled();
    });
    it('should expect files to be undefined', function() {
        var file = [
            scope.video = {
                type: 'video/mp4',
                size: 0
            }
        ];
        scope.changeSize = true;
        var index;
        scope.onFileSelect(file, index);
        expect(file).toBeDefined();
        expect(scope.changeSize).toBeFalsy();
        file = [
            scope.video = {
                type: 'video/mkv',
                size: 700000000
            }
        ];
        scope.changeSize = false;
        scope.onFileSelect(file, index);
        expect(scope.changeSize).toBeTruthy();
    });

    it('should expect plum checkbox to be checked', function() {
        scope.smartererCheck = false;
        scope.plumCheck = false;
        scope.toggleCheck('smarterer');
        expect(scope.smartererCheck).toBeTruthy();
        scope.toggleCheck('plum');
        expect(scope.plumCheck).toBeTruthy();
    });

    describe('scope.update', function() {
        beforeEach(function() {
            scope.fellow = {
                uid: 'uid',
                videoUrl: 'yyyyyyy',
                fullName: 'fellow',
                firstName: 'gdghdghgd',
                lastName: 'dgghghggs',
                plumEmail: 'gghhh@sola.com'
            };
            scope.currentUser = {
                uid: 'uid'
            };
            scope.plumCheck = true;
            spyOn(scope, 'update');
            scope.update();
        });
        it('should expect update to have been called', function() {
            expect(scope.update).toHaveBeenCalled();
        });
    });
});
