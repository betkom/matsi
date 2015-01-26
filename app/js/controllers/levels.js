angular.module('matsi.controllers')
    .controller("LevelCtrl", ['$rootScope', '$scope', '$cookies', 'Levels', '$modalInstance',
        function($rootScope, $scope, $cookies, Levels, $modalInstance) {

            //Developer rank
            $scope.levels = Levels.all().$loaded(function(val) {
                $scope.levels = val;
            });

            $scope.createLevel = function(level) {
                Levels.create(level);
                $modalInstance.close(level);
            };
            $scope.deleteLevel = function(level) {
                Levels.delete(level);
            };
            $scope.updateLevel = function(level) {
                Levels.update(level);
            };
            $scope.ok = function(){
              $modalInstance.close();
            };
    }]);
