'use strict';


angular.module('matsi.directives')
    .directive('notification', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/shared/notification.html',
            controller: ['$rootScope','$scope', 'User', 'Fellow', function($rootScope, $scope,  User, Fellow) {
                    $scope.mentor = User.find($scope.user_id);
            }]
        };
    });