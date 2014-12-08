angular.module("matsi.controllers")
    .controller("MentorController", ['$rootScope', '$scope', '$cookies', 'MentorService', '$stateParams', '$location',
        function($rootScope, $scope, $cookies, MentorService, $stateParams, $location) {
            $scope.mentorData = {};
            $scope.mentors = [];
            if ($rootScope.currentUser) {
                $scope.mentorData = MentorService.profile($rootScope.currentUser.uid);
            }
            $scope.mentors = MentorService.find();
            $scope.OneMentorData = MentorService.findOne($stateParams.uid);
            console.log($scope.OneMentorData);
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
                   MentorService.update(data, function(err) {
                       if (err) {
                           alert('Hoops! Data not updated succesfully');
                       } else {
                           alert('Data updated successfully');
                           $location.path('/myProfile');
                       }
                   });
               } else {
                   alert('You must agree to the Terms');
               }
           };
        }
    ]);
