describe('matsi.controller test', function() {
    var scope,
        ctrl,
        Mentor,
        MailService,
        mockMentor = {
           uid: 'happy-mentor-id',
           role: '-mentor-',
           fullName: 'Happy Mentor',
           email: 'happy-mentor-id@andela.co',
           picture: 'this is pic url',
           firstName: 'happy'
        };
    beforeEach(module('Matsi'));
    beforeEach(inject(function($controller, $rootScope, $cookies, $injector) {
        scope = $rootScope;
        ctrl = $controller('MentorCtrl', {
            $scope: scope
        });
        Mentor = $injector.get('Mentor');
        MailService = $injector.get('MailService');
        $cookies.rootRef = 'https://brilliant-heat-9512.firebaseio.com/';
    }));

    it('should expect check to toggle', function() {
        scope.checked = true;
        scope.toggleCheck();
        expect(scope.checked).toBeFalsy();
    });
    it('should paginate on shuffle', function(){
       var start = 0,
                end = 0,
                currentPage = 0,
                numPerPage = 2,
                mentors = [
                scope.mentor1 = {},
                scope.mentor2 = {}
                ],
                lastIndexOfMentors = 0;
        scope.mentorsFilter();
        expect(scope.mentors.length).toBe(0);
    });

    it('should expect checkAll to check all checkbox', function(){
        scope.mentorCheck = false;
        scope.allCheck = false;
        scope.mentors = [
            scope.mentor = {
                uid: 'uid'
            }
        ];
        scope.checkAll();
        expect(scope.allCheck).toBeTruthy();
        expect(scope.mentorCheck).toBeTruthy();
        expect(scope.allCheck).toBe(scope.mentorCheck);
        scope.mentorCheck = true;
        scope.checkAll();
        expect(scope.mentorCheck).toBeFalsy();
        expect(scope.allCheck).toBe(scope.mentorCheck);
    });

    it('should call Mentor service findOne function', function(){
        spyOn(Mentor, 'findOne');
        scope.findOne();
        expect(Mentor.findOne).toHaveBeenCalled();
    });

    it('should call Mentor service all function', function(){
      spyOn(Mentor, 'all');
      scope.all();
      expect(Mentor.all).toHaveBeenCalled();
    });

    it('should expect delete to have been called', function() {
        var mentorId = 'uid';
        spyOn(Mentor, 'delete');
        scope.delete(mentorId);
        expect(Mentor.delete).toHaveBeenCalled();
    });

    it('should call Mentor service disabled function', function() {
        spyOn(Mentor, 'disabled');
        scope.disabled();
        expect(Mentor.disabled).toHaveBeenCalled();
    });

    it('should call Mentor service enable function', function() {
      scope.mentor = {
            uid: 'uid'
        };
        spyOn(Mentor, 'enable');
        scope.enable(scope.mentor);
        expect(Mentor.enable).toHaveBeenCalled();
    });
     it('should enable All Mentor', function() {
        scope.mentorCheck = true;
        scope.mentors = [
            scope.mentor = {
                uid: 'uid'
            }
        ];
        spyOn(Mentor, 'enable');
        scope.enableAll(scope.mentors);
        expect(Mentor.enable).toHaveBeenCalled();
    });
    it('should call Mentor service update function', function() {
        scope.mentor = {
            uid: 'uid'
        };
        scope.currentUser = {
            uid: 'uid'
        };
        spyOn(Mentor, 'update');
        scope.update();
        expect(Mentor.update).toHaveBeenCalled();
    });
    
    it('should call sendmail', function(){
        scope.mentor = {
            uid: 'uid',
            email: 'mentor@mentor.com'
        };
        spyOn(MailService, 'send');
        scope.sendMessage(scope.mentor);
        expect(MailService.send).toHaveBeenCalled();
    });
});
