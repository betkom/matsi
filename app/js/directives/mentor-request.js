angular.module("matsi.directives")
    .directive('mentorRequest', function($mdToast) {
        return {
            restrict: 'E',
            templateUrl: '/pages/mentor-request.html',
            controller: ['$scope', '$http', 'Mentor', 'MailService', 'Fellow', function($scope, $http, MentorService, MailService, FellowService) {
                
                $scope.mentor = MentorService.findOne($scope.mentor_uid);
                $scope.showMessageBox = false;
                
                $scope.accept = function() {
                    console.log('blue ribbon');
                    FellowService.accept($scope.mentor);
                    MailService.send(3,$scope.mentor);
                };

                $scope.openToast = function($event) {
                    console.log('*********** red ribbon');
                    $mdToast.show($mdToast.simple().content('Request Accepted'));
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
