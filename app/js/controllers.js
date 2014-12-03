angular.module("matsi.controllers", ['firebase', 'ngCookies'])
    .controller('HomeController', ['$rootScope', '$scope', '$mdSidenav', '$location', '$state', 'FellowService',
        function($rootScope, $scope, $mdSidenav, $location, $state, FellowService) {

        }
    ])
    .controller("FellowController", ['$rootScope', '$scope', '$cookies', 'FellowService', '$http', '$stateParams', 'MentorService',
        function($rootScope, $scope, $cookies, FellowService, $http, $stateParams, MentorService) {


            var currentUserUid = $stateParams.uid || $rootScope.currentUser.uid;

            // if ($rootScope.currentUser) {
            //     $scope.fellowData = FellowService.readMyProfile($rootScope.currentUser.uid);
            // };

            $scope.getAllFellows = function() {
                $scope.allFellows = FellowService.readFellow();
            };

            $scope.getCurrentFellow = function() {
                console.log($stateParams.uid, 'user_uid');
                $scope.fellowData = FellowService.readSingleFellow(currentUserUid);
            };
            $scope.submitFellow = function() {
                FellowService.updateFellow($scope.fellowData, $rootScope.currentUser.uid);
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
            $scope.accept = function(mentor) {
                console.log(mentor);
                FellowService.acceptRequest(mentor);
            };

            $scope.sendRequests = function() {
                console.log("blue berry")
                FellowService.regRequest($scope.fellowData.uid);
            };
        }
    ])
    .controller("MainCtrl", ['$rootScope', '$scope', '$firebase', '$cookies', 'FellowService',
        function($rootScope, $scope, $firebase, $cookies, FellowService) {

        }
    ])
    .controller("MentorController", ['$rootScope', '$scope', '$cookies', 'MentorService', '$stateParams',
        function($rootScope, $scope, $cookies, MentorService, $stateParams) {
            // $stateParams.uid = "hello";
            $scope.mentorData = {};
            $scope.mentors = [];

            if ($rootScope.currentUser) {
                $scope.mentorData = MentorService.readMyProfile($rootScope.currentUser.uid);
            };
            $scope.mentors = MentorService.readMentor();
            $scope.OneMentorData = MentorService.readSingleMentor($stateParams.uid);
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
