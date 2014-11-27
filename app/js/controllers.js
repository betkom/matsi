angular.module("matsi.controllers", ['firebase', 'ngCookies'])
    .controller('HomeController', ['$rootScope', '$scope', '$mdSidenav', '$location', '$state', 'FellowService',
        function($rootScope, $scope, $mdSidenav, $location, $state, FellowService) {

        }
    ])
    .controller("FellowController", ['$rootScope', '$scope', '$cookies', 'FellowService', '$http', '$stateParams', 'MentorService',
        function($rootScope, $scope, $cookies, FellowService, $http, $stateParams, MentorService) {
            
            if ($rootScope.currentUser) {
                $scope.fellowData = FellowService.readMyProfile($rootScope.currentUser.uid);
            };
            
            $scope.allFellows = FellowService.readFellow();
            $scope.oneFellowData = FellowService.readSingleFellow();
            $scope.submitFellow = function() {
                FellowService.updateFellow($scope.fellowData, $rootScope.currentUser.uid);
            };
            $scope.sendMail = function() {
              // if (!$rootScope.currentUser) { 
              //   alert("You Need to be logged in before you can mentor This fellow!!");
              //   return false;
              // };
                var paramsFellow = angular.copy($scope.oneFellowData);
                delete paramsFellow.$id;
                delete paramsFellow.$priority;
                console.log(paramsFellow, 'rackCity');
                //var paramsMentor = MentorService.readSingleMentor();
                $http.post('/mail/user/1', paramsFellow).success(function(r) {
                    console.log(r);
                });
            };
        }
    ])
    .controller("MainCtrl", ['$rootScope', '$scope', '$firebase', '$cookies', 'FellowService',
        function($rootScope, $scope, $firebase, $cookies, FellowService) {
          
        }
    ])
    .controller("MentorController", ['$rootScope', '$scope', '$cookies', 'MentorService',
        function($rootScope, $scope, $cookies, MentorService) {
            // $stateParams.uid = "hello";
            $scope.mentorData = {};
            $scope.mentors = [];
            
            if ($rootScope.currentUser) {
              $scope.mentorData = MentorService.readMyProfile($rootScope.currentUser.uid);
            };
            $scope.mentors = MentorService.readMentor();
            $scope.OneMentorData = MentorService.readSingleMentor();
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


