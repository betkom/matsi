angular.module("matsi.controllers", ['firebase', 'ngCookies'])
    .controller('HomeController', ['$rootScope', '$scope', '$mdSidenav', '$location', '$state', 'FellowService',
        function($rootScope, $scope, $mdSidenav, $location, $state, FellowService) {

        }
    ])
    .controller("FellowController", ['$rootScope', '$scope', '$cookies', 'FellowService', '$http', '$stateParams', 'MentorService',
        function($rootScope, $scope, $cookies, FellowService, $http, $stateParams, MentorService) {
            console.log($rootScope,"this is root");
            console.log($rootScope.currentUser,"this is val");
            if($rootScope.currentUser){
            var currentUserUid = $stateParams.uid || $rootScope.currentUser.uid;
            console.log($rootScope.currentUser.uid,'from tolu');
        }else{
            var currentUserUid = $stateParams.uid;
        }
            // if ($rootScope.currentUser) {
            //     $scope.fellowData = FellowService.readMyProfile($rootScope.currentUser.uid);
            // };

            $scope.getAllFellows = function() {
              $scope.allFellows = FellowService.readFellow();
              console.log($scope.allFellows);
              console.log($scope.allFellows.length);
            };

            $scope.getCurrentFellow = function() {
                //console.log($stateParams.uid, 'user_uid');
                console.log($scope.fellowData, 'Tolu was here');
                $scope.fellowData = FellowService.readSingleFellow(currentUserUid);
                this.showMessageBox = true;
            };

            $scope.submitFellow = function() {
              FellowService.updateFellow($scope.fellowData);
            };

            $scope.showBox1 = function(){
                $scope.showMessageBox = false;
            };

            $scope.mentorConstraints = function() {
                FellowService.mentorConstraint(function(responseData){

                  if (responseData) {
                      if (responseData.length === 0) {
                          $scope.sendMail();
                      } else {
                        alert("The fellow is already being mentored, there are other fellows waiting")
                      }
                  } else {
                    $scope.sendMail();
                  }
                });     
            };

            $scope.sendMail = function() {
                var paramsFellow = angular.copy($scope.fellowData);
                delete paramsFellow.$id;
                delete paramsFellow.$priority;
                $http.post('/mail/user/1', paramsFellow).success(function(r) {
                    console.log(r);
                    console.log("Mail sent")
                });
                $scope.sendRequests();
            };

            $scope.sendRequests = function() {
                FellowService.regRequest($scope.fellowData);
            };
        }
    ])
    .controller("MentorController", ['$rootScope', '$scope', '$cookies', 'MentorService', '$stateParams','$location',
        function($rootScope, $scope, $cookies, MentorService, $stateParams, $location) {
            // $stateParams.uid = "hello";
            // console.log($rootScope.currentUser,"ghgvhvvjvhgghv");
            $scope.mentorData = {};
            $scope.mentors = [];

            if ($rootScope.currentUser) {
                $scope.mentorData = MentorService.readMyProfile($rootScope.currentUser.uid);
            };
            $scope.mentors = MentorService.readMentor();
            $scope.OneMentorData = MentorService.readSingleMentor($stateParams.uid);
            $scope.authCheck = function(){
                if ((!$rootScope.currentUser) || ($rootScope.currentUser.role !== "-mentor-")) {
                $location.path('/');
                return;
            }
            };
            //console.log($scope.FindOneMentor, 'fireeee');
            //$scope.FindOneMentor.$bindTo($scope, 'mentorData');
            $scope.submitMentor = function(data) {
                if (document.getElementById('Agree').checked) {
                    MentorService.updateMentor(data, $rootScope.currentUser.uid, function(error) {
                        if (error) {
                            alert('Hoops! Data not updated succesfully');
                        } else {
                            alert('Data updated successfully');
                        }
                    });
                } else {
                    alert('You must agree to the Terms')
                }
            };
        }
    ]);
