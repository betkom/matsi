angular.module("matsi.directives")
    .directive('mentorRequest', function() {
        return {
            restrict: 'E',
            templateUrl: '/pages/mentor-request.html',
            controller: ['$scope', '$http', 'MentorService', 'MailService', 'FellowService', function($scope, $http, MentorService, MailService, FellowService) {
                
                $scope.mentor = MentorService.findOne($scope.mentor_uid);
                $scope.showMessageBox = false;
                
                $scope.accept = function() {
                    FellowService.accept($scope.mentor);
                    MailService.send(3,$scope.mentor);
                };
                
                $scope.reject = function() {
                    FellowService.reject($scope.mentor);
                    MailService.send(4,$scope.mentor);
                    $scope.showMessageBox = false;
                };

                $scope.showBox = function() {
                    $scope.showMessageBox = true;
                };
            }]
        };
    });