describe('matsi.controller test', function() {

    var scope,
        stateParams,
        Fellow,
        Log,
        ctrl;
    beforeEach(module('Matsi'));
    beforeEach(inject(function($controller, $rootScope, $cookies, $injector) {
        scope = $rootScope;
        Fellow = $injector.get('Fellow');
        Log = $injector.get('Log');
        stateParams = $injector.get('$stateParams');
        ctrl = $controller('FellowCtrl', {
            $scope: scope
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

    it('should expect findOne to have been called', function() {
        scope.currentUser = {
            uid: 'uid'
        };
        spyOn(Fellow, 'findOne');
        scope.findOne();
        expect(Fellow.findOne).toHaveBeenCalled();
    });

    it('should expect update to have been called', function() {
        scope.fellow = {
            uid: 'uid'
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
        scope.fellow = {};
        spyOn(Fellow, 'request');
        scope.sendRequest();
        expect(Fellow.request).toHaveBeenCalled();
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
    it('should expect allLogs to have been called', function(){
        spyOn(Log, 'allLogs');
        scope.allLogs();
        expect(Log.allLogs).toHaveBeenCalled();

    });
    it('should expect allMentored to have been called', function(){
        spyOn(Log, 'allMentored');
        scope.allMentored();
        expect(Log.allMentored).toHaveBeenCalled();
    });
    it('should expect allunMentored to have been called', function(){
        spyOn(Log, 'allUnMentored');
        scope.allUnMentored();
        expect(Log.allUnMentored).toHaveBeenCalled();
    });
    it('should expect files to be undefined', function(){
        var file;
        var index = ''; 
        scope.onFileSelect(index);
        expect(file).toBeUndefined();
    });
    // it('should set fileloading to be true', function(){
    //     var file;
    //     var index;
    //     scope.fileloading = false;
    //     scope.start(file, index);
    //     expect(scope.fileloading).toBeTruthy();
    // });

});

