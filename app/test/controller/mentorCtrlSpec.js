describe('matsi.controller test', function() {
    var scope,
        ctrl,
        Mentor,
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
        $cookies.rootRef = 'https://brilliant-heat-9512.firebaseio.com/';
    }));

    it('should expect check to toggle', function() {
        scope.checked = true;
        scope.toggleCheck();
        expect(scope.checked).toBeFalsy();
        // expect(scope).toBeDefined()
        // expect(end).toEqual(4);
    });
    it('should call findOne in the service', function() {
        spyOn(Mentor, 'findOne');
        scope.findOne();
        expect(Mentor.findOne).toHaveBeenCalled();

    });
    it('should call disabled function in the service', function() {
        spyOn(Mentor, 'disabled');
        scope.disabled();
        expect(Mentor.disabled).toHaveBeenCalled();
    });
    it('should call enable function in the service', function() {
        spyOn(Mentor, 'enable');
        scope.enable();
        expect(Mentor.enable).toHaveBeenCalled();
    });
    it('should call update function in the service', function() {
        spyOn(Mentor, 'update');
        scope.currentUser = mockMentor;
        console.log(scope.currentUser, 'currentUser');
        console.log(mockMentor.uid);
       	scope.currentUser.uid = mockMentor.uid;
       	$scope.mentor.uid = scope.currentUser.uid;
        scope.update();
        expect(Mentor.update).toHaveBeenCalled();
    });

});
