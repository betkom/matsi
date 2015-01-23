// describe('matsi.controller test', function() {
//     var Levels,
//         rootScope,
//         scope,
//         ctrl;
//     beforeEach(module('Matsi'));
//     beforeEach(inject(function($controller, $rootScope, $cookies, $injector) {
//         scope = $rootScope;
//         stateParams = $injector.get('$stateParams');
//         rootScope = $injector.get('$rootScope');
//         Levels = $injector.get('Levels');
//         ctrl = $controller('LevelCtrl', {
//             $scope: scope,
//             $rootScope: scope
//         });
//         $cookies.rootRef = 'https://brilliant-heat-9512.firebaseio.com/';
//     }));
//     it('should expect delete levels to have been called', function() {
//         var levelId = 'id';
//         spyOn(Levels, 'delete');
//         scope.deleteLevel(levelId);
//         expect(Levels.delete).toHaveBeenCalled();
//     });
//     it('should expect scope. levels to be defined', function() {
//         expect(scope.levels).toBeDefined();
//     });
//     it('should expect Levels create to have been called', function() {
//         var levelId = 'id';
//         spyOn(Levels, 'create');
//         scope.createLevel();
//         expect(Levels.create).toHaveBeenCalled();
//     });

//     it('should expect Levels update to have been called', function() {
//         var levelId = 'id';
//         spyOn(Levels, 'update');
//         scope.updateLevel();
//         expect(Levels.update).toHaveBeenCalled();
//     });
// });
