angular.module("matsi.directives")
    .directive('mentorRequest', function($mdToast) {
        return {
            restrict: 'E',
            templateUrl: '/pages/mentor-request.html',
            controller: ['$scope', '$http', 'Mentor', 'MailService', 'Fellow', 'utils', function($scope, $http, MentorService, MailService, Fellow, utils) {

                $scope.mentor = MentorService.findOne($scope.mentor_uid);
                $scope.showMessageBox = false;

                $scope.accept = function() {
                    console.log('blue ribbon');
                    Fellow.accept($scope.mentor);
                    MailService.send(3, $scope.mentor);
                    utils.openToast('Request Accepted');

                };

                $scope.reject = function() {
                    Fellow.reject($scope.mentor);
                    MailService.send(4, $scope.mentor);
                    $scope.showMessageBox = false;
                    utils.openToast('Request Rejected');

                };

                $scope.showBox = function() {
                    $scope.showMessageBox = true;
                };
            }]
        };
    });
