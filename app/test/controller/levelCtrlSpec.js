describe('matsi.controller test', function() {
    var Levels,
        rootScope,
        scope,
        modalInstance,
        ctrl;
    beforeEach(module('Matsi'));
    beforeEach(inject(function($controller, $rootScope, $cookies, $injector) {
        scope = $rootScope;
        modalInstance = {                    // Create a mock object using spies
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss'),
        result: {
          then: jasmine.createSpy('modalInstance.result.then')
        }
      };
        stateParams = $injector.get('$stateParams');
        rootScope = $injector.get('$rootScope');
        Levels = $injector.get('Levels');
        ctrl = $controller('LevelCtrl', {
            $scope: scope,
            $rootScope: scope,
            $modalInstance: modalInstance
        });

        $cookies.rootRef = 'https://brilliant-heat-9512.firebaseio.com/';
    }));
    it('should expect delete levels to have been called', function() {
        var levelId = 'id';
        spyOn(Levels, 'delete');
        scope.deleteLevel(levelId);
        expect(Levels.delete).toHaveBeenCalled();
    });
    it('should expect scope. levels to be defined', function() {
        expect(scope.levels).toBeDefined();
    });
    it('should expect Levels create to have been called', function() {
        var levelId = 'id';
        spyOn(Levels, 'create');
        scope.createLevel();
        expect(Levels.create).toHaveBeenCalled();
    });

    it('should expect Levels update to have been called', function() {
        var levelId = 'id';
        spyOn(Levels, 'update');
        scope.updateLevel();
        expect(Levels.update).toHaveBeenCalled();
    });
    it('should expect scope.ok to call modal close', function(){
      scope.ok();
      expect(modalInstance.close).toHaveBeenCalled();
    });
});
