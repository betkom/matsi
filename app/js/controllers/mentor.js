angular.module("matsi.controllers", ['firebase', 'ngCookies'])
    .controller("MentorController", ['$rootScope', '$scope', '$cookies', 'MentorService', '$stateParams', '$location',
        function($rootScope, $scope, $cookies, MentorService, $stateParams, $location) {
            $scope.mentorData = {};
            $scope.mentors = [];
            if ($rootScope.currentUser) {
                $scope.mentorData = MentorService.readMyProfile($rootScope.currentUser.uid);
            };
            $scope.mentors = MentorService.readMentor();
            $scope.OneMentorData = MentorService.readSingleMentor($stateParams.uid);
            $scope.authCheck = function() {
                if ((!$rootScope.currentUser) || ($rootScope.currentUser.role !== "-mentor-")) {
                    $location.path('/');
                    return;
                }
            };

            $scope.checked = false;
           $scope.toggleCheck = function(){
               $scope.checked = !$scope.checked;
           };
           $scope.submitMentor = function(data) {
               if ($scope.checked) {
                   MentorService.updateMentor(data, $rootScope.currentUser.uid, function(err) {
                       if (err) {
                           alert('Hoops! Data not updated succesfully');
                       } else {
                           alert('Data updated successfully');
                       }
                   });
               } else {
                   alert('You must agree to the Terms');
               }
           };
        }
    ]);
