angular.module("matsi.controllers")
    .controller("FellowController", ['$rootScope', '$scope', '$cookies', 'FellowService', '$http', '$stateParams', 'MentorService', 'MailService', '$mdDialog',
    function($rootScope, $scope, $cookies, FellowService, $http, $stateParams, MentorService, MailService, $mdDialog) {
  
        $scope.all = function() {
            $scope.fellows = FellowService.all();
        };

        $scope.findOne = function() {
            var uid = $rootScope.currentUser?($stateParams.uid || $rootScope.currentUser.uid):$stateParams.uid;
            $scope.fellow = FellowService.findOne(uid);
            this.showMessageBox = true;
        };

        $scope.update = function() {
          if($rootScope.currentUser.uid === $scope.fellow.uid || $rootScope.currentUser.isAdmin){

          }
          FellowService.update($scope.fellow);
        };

        $scope.showBox = function() {
            $scope.showMessageBox = false;
        };

        $scope.showAlert = function(ev) {
            $mdDialog.show(
                $mdDialog.alert()
                .title('')
                .content('This fellow is already being mentored, please select a fellow that isn\'t currently being mentored')
                .ariaLabel('Password notification')
                .ok('Okay!')
                .targetEvent(ev)
            );
        };

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };
        }

        $scope.mentorConstraints = function() {
          FellowService.mentorConstraint($stateParams.uid, function(res,hasUnmentored) {
            if (res) {
              if (hasUnmentored){
                $scope.sendRequest();
              } else {
                $scope.showAlert();
              }
            } 
            else {
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
