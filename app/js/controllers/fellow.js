angular.module("matsi.controllers")
    .controller("FellowController", ['$rootScope', '$scope', '$cookies', 'FellowService', '$http', '$stateParams', 'MentorService', 'MailService',
    function($rootScope, $scope, $cookies, FellowService, $http, $stateParams, MentorService, MailService) {
  
        $scope.all = function() {
            $scope.fellows = FellowService.all();
        };

        $scope.findOne = function() {
            var uid = $rootScope.currentUser?($stateParams.uid || $rootScope.currentUser.uid):$stateParams.uid;
            $scope.fellow = FellowService.findOne(uid);
            this.showMessageBox = true;
        };

        $scope.update = function() {
          if($rootScope.currentUser.uid === $scope.fellow.uid || $rootScope.currentUser.isAdmin)
          {

          }
          FellowService.update($scope.fellow);
        };

        $scope.showBox = function() {
            $scope.showMessageBox = false;
        };

        $scope.mentorConstraints = function() {
          FellowService.mentorConstraint(function(responseData) {
            if (responseData) {
              if (responseData.length === 0) {
                  $scope.sendRequest();
              } else {
                alert("The fellow is already being mentored, there are other fellows waiting");
              }
            } else {
              $scope.sendRequest();
            }
          });
        };

        $scope.sendRequest = function() {
          $scope.fellow.reason = $scope.fellow.message;
          MailService.send(1, $scope.fellow);
          FellowService.request($scope.fellow);
        };
    }
]);
