'use strict';


angular.module('matsi.directives')
    .directive('mentorRequest', function() {
        return {
            restrict: 'E',
            templateUrl: '/pages/mentor-request.html',
            controller: 'mentorRequestCtrl'
        };
    }).controller('mentorRequestCtrl', ['$rootScope','$scope', '$http', 'Mentor', 'MailService', 'Fellow', 'Utils','Log','User', function($rootScope, $scope, $http, Mentor, MailService, Fellow, Utils, Log, User){
            $scope.mentor = User.find($scope.mentor_uid);
            $scope.showMessageBox = false;
            // Accept mentor request
            $scope.accept = function() {
                Fellow.accept($scope.mentor);
                MailService.send(3, $scope.mentor);
                Utils.openToast('Request Accepted');
                var info = $scope.mentor.fullName + "'s mentor request has been accepted by " + $rootScope.currentUser.fullName;
                var pic = 'fa fa-tag fa-fw';
                Log.save(info, pic);
            };
            // Reject mentor request
            $scope.reject = function() {
                Fellow.reject($scope.mentor);
                MailService.send(4, $scope.mentor);
                $scope.showMessageBox = false;
                Utils.openToast('Request Rejected');
                var info = $scope.mentor.fullName +  "'s mentor request has been rejected by " + $rootScope.currentUser.fullName;
                var pic = 'fa fa-tag fa-fw';
                Log.save(info, pic);
            };
            $scope.showBox = function() {
                $scope.showMessageBox = true;
            };
    }]);

