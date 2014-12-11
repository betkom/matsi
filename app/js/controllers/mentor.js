angular.module("matsi.controllers")
    .controller("MentorCtrl", ['$rootScope', '$scope', '$cookies', 'Mentor', '$stateParams', '$location',
        function($rootScope, $scope, $cookies, Mentor, $stateParams, $location) {
          $scope.checked = false;
          $scope.toggleCheck = function(){
              $scope.checked = !$scope.checked;
          };

           $scope.findOne = function() {
            var uid = $rootScope.currentUser?($stateParams.uid || $rootScope.currentUser.uid):$stateParams.uid;
            $scope.mentor = Mentor.findOne(uid);
          };
          $scope.all = function(){
            $scope.mentors = Mentor.all();
          };

          $scope.update = function() {
            if($rootScope.currentUser.uid === $scope.fellow.uid || $rootScope.currentUser.isAdmin){ 
              if ($scope.checked) {
                Mentor.update(data, function(err) {
                  if (err){
                    alert('Hoops! Data not updated succesfully');
                  }
                  else {
                    alert('Data updated successfully');
                  }
                });
              }
              else {
                alert('You must agree to the Terms');
              }
            }
          };
    }]);
