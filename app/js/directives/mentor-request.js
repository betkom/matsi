angular.module("matsi.directives")
    .directive('mentorRequest', function() {
        return {
            restrict: 'E',
            templateUrl: '/pages/mentor-request.html',
            controller: ['$scope', '$http', 'MentorService', 'MailService', 'FellowService', function($scope, $http, MentorService, MailService, FellowService) {
                $scope.mentorData = MentorService.readSingleMentor($scope.mentor_uid, function(value) {
                    $scope.mentor.uid = value.uid;
                    $scope.mentor.email = value.email;
                    $scope.mentor.firstName = value.firstName;
                });
                $scope.accept = function() {
                    FellowService.acceptRequest($scope.mentor);
                };
                $scope.sendMail1 = function() {
                    MailService.send(3,$scope.mentor);
                    $scope.accept();
                };
                $scope.reject = function() {
                    FellowService.rejectRequest($scope.mentor);
                    $scope.showMessageBox = true;
                };
                $scope.sendRejectMail = function(){
                    MailService.send(4,$scope.mentor);
                    $scope.reject();
                };
                $scope.showBox = function() {
                    $scope.showMessageBox = false;
                }
            }]
        };
    });
