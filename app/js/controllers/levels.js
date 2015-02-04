'use strict';


angular.module('matsi.controllers')
    .controller('LevelCtrl', ['$rootScope', '$scope', '$cookies', 'Levels', '$modalInstance',
        function($rootScope, $scope, $cookies, Levels, $modalInstance) {
            $scope.newLevel = false;
            $scope.editLevel = false;

            $scope.toggleCheck = function(val) {
              if (val === 'new'){
                $scope.newLevel = !$scope.newLevel;
            } else {
                $scope.editLevel = !$scope.editLevel;
              }
            };

            //Developer rank
            $scope.levels = Levels.all().$loaded(function(val) {
                $scope.levels = val;
            });

            $scope.createLevel = function(level) {
                $scope.newLevel = true;
                Levels.create(level);
                $modalInstance.close(level);
            };
            $scope.deleteLevel = function(level) {
                $scope.editLevel = true;
                Levels.delete(level);
            };
            $scope.updateLevel = function(level) {
                $scope.editLevel = true;
                Levels.update(level);
            };
            $scope.ok = function(){
              $modalInstance.close();
            };
    }]);
