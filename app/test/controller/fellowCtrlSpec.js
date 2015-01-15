describe('matsi.controller test', function() {

    var scope,
        stateParams,
        Fellow,
        Log,
        MailService,
        rootScope,
        ctrl;
    beforeEach(module('Matsi'));
    beforeEach(inject(function($controller, $rootScope, $cookies, $injector) {
        scope = $rootScope;
        Fellow = $injector.get('Fellow');
        Log = $injector.get('Log');
        MailService = $injector.get('MailService');
        stateParams = $injector.get('$stateParams');
        rootScope = $injector.get('$rootScope');
        ctrl = $controller('FellowCtrl', {
            $scope: scope,
            $rootScope: scope
        });
        $cookies.rootRef = 'https://brilliant-heat-9512.firebaseio.com/';
    }));

    it('should expect backEndPost to have been called', function() {
        scope.fellow = {};
        scope.fellow.plumEmail = 'this is plumEmail';
        scope.fellow.firstName = 'this is fname';
        scope.fellow.lastName = 'this is lname';
        spyOn(Fellow, 'backEndPost');
        scope.plum();
        expect(Fellow.backEndPost).toHaveBeenCalled();
    });
    it('should clear the date', function(){
        scope.dt = '2014-01-03';
        scope.clear();
        expect(scope.dt).toBe(null);
    });
    it('should paginate on shuffle', function(){
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
    // it('should call filter', function(){
    //     var start = 0,
    //             end = 0,
    //             currentPage = 1,
    //             numPerPage = 2,
    //             fellowsOnpage = [
    //             scope.fellow1 = {},
    //             scope.fellow2 = {}
    //             ],
    //             lastIndexOfFellows = 0;
    //             scope1 = jasmine.createSpyObj('scope', ['fellowsFilter']);
    //             scope.shuffle();
    //             expect(scope1.fellowsFilter).toHaveBeenCalled();

    // });
    it('should expect findOne to have been called', function() {
        scope.currentUser = {
            uid: 'uid'
        };
        spyOn(Fellow, 'findOne');
        scope.findOne();
        expect(Fellow.findOne).toHaveBeenCalled();
    });

    it('should expect update to have been called', function() {
        scope.uploadedResult = 'https://kehesjay.s3-us-west-2.amazonaws.com/People';
        scope.videoUrl = scope.uploadedResult;
        scope.fellow = {
            uid: 'uid',
            videoUrl: 'yyyyyyy',
            fullName: 'fellow'
        };
        scope.currentUser = {
            uid: 'uid'
        };
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
        scope.onFileSelect(file,index);
        expect(file).toBeDefined();
        expect(scope.changeSize).toBeFalsy();
        file = [
        scope.video = {
          type: 'video/mkv',
          size: 700000000
        }
        ];
        scope.changeSize = false;
        scope.onFileSelect(file,index);
        expect(scope.changeSize).toBeTruthy();
    });

    it('should expect plum checkbox to be checked', function() {
        scope.check = false;
        scope.plumCheck = false;
        scope.toggleCheck('smarterer');
        expect(scope.check).toBeTruthy();
        scope.toggleCheck('plum');
        expect(scope.plumCheck).toBeTruthy();
    });
});
