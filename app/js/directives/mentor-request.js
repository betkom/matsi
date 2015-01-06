angular.module("matsi.directives")
    .directive('mentorRequest', function($mdToast) {
        return {
            restrict: 'E',
            templateUrl: '/pages/mentor-request.html',
            controller: ['$rootScope','$scope', '$http', 'Mentor', 'MailService', 'Fellow', 'utils','Log', function($rootScope, $scope, $http, Mentor, MailService, Fellow, utils, Log) {

                $scope.mentor = Mentor.findOne($scope.mentor_uid);
                $scope.showMessageBox = false;

                $scope.accept = function() {
                    Fellow.accept($scope.mentor);
                    MailService.send(3, $scope.mentor);
                    utils.openToast('Request Accepted');
                    var info = $scope.mentor.fullName + "'s mentor request has been accepted by " + $rootScope.currentUser.fullName;
                    //var info2 = $scope.mentor.firstName + 'is mentoring ' + $rootScope.currentUser.firstName;
                    Log.save(info);
                    //Log.mentorHistory(info2);
                };
                $scope.reject = function() {
                    Fellow.reject($scope.mentor);
                    MailService.send(4, $scope.mentor);
                    $scope.showMessageBox = false;
                    utils.openToast('Request Rejected');
                    var info = $scope.mentor.fullName +  "'s mentor request has been rejected";
                    Log.save(info);
                };
                $scope.showBox = function() {
                    $scope.showMessageBox = true;
                };
            }]
        };
    });
