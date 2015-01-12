describe('matsi.controller test', function() {

    var scope,
        stateParams,
        Fellow,
        Log,
        MailService,
        ctrl;
    beforeEach(module('Matsi'));
    beforeEach(inject(function($controller, $rootScope, $cookies, $injector) {
        scope = $rootScope;
        Fellow = $injector.get('Fellow');
        Log = $injector.get('Log');
        MailService = $injector.get('MailService');
        stateParams = $injector.get('$stateParams');
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
        //spyOn(Log, 'save');
        scope.plum();
        expect(Fellow.backEndPost).toHaveBeenCalled();
        //expect(Log.save).toHaveBeenCalled();
    });

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
            videoUrl: 'yyyyyyy'
        };
        scope.currentUser = {
            uid: 'uid'
        };
        spyOn(Fellow, 'update');
        scope.update();
        expect(Fellow.update).toHaveBeenCalled();
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
        spyOn(Log, 'allLogs');
        scope.allLogs();
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
            type: '',
            size: 0
        }
        ];
        var index;
        scope.onFileSelect(file,index);
        expect(file).toBeDefined();
    });

    it('should expect plum checkbox to be checked', function() {
        scope.check = false;
        scope.plumCheck = false;
        scope.toggleCheck('smarterer');
        expect(scope.check).toBeTruthy();
    });
});
