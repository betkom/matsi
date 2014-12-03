angular.module("matsi.controllers", ['firebase', 'ngCookies'])
    .controller('HomeController', ['$rootScope', '$scope', '$mdSidenav', '$location', '$state', 'FellowService',
        function($rootScope, $scope, $mdSidenav, $location, $state, FellowService) {

        }
    ])
    .controller("FellowController", ['$rootScope', '$scope', '$cookies', 'FellowService', '$http', '$stateParams', 'MentorService',
        function($rootScope, $scope, $cookies, FellowService, $http, $stateParams, MentorService) {
            console.log($rootScope,"this is root");
            console.log($rootScope.currentUser,"this is val");
            // console.log($scope.currentUser ,'from child scope');
            // console.log($rootScope,"first call");
            // console.log($rootScope.currentUser,"second call");
            // console.log(AuthService,"service call1");
            // console.log(AuthService.currentUser,"service call user");
            // console.log(AuthService.currentUser.role,"service call user role");
            // console.log(AuthService,"service call2");
            $scope.fellowData = FellowService.readMyProfile($rootScope.currentUser.uid);
            if ($rootScope.currentUser) {
                console.log($rootScope.currentUser,"third call");
                $scope.fellowData = FellowService.readMyProfile($rootScope.currentUser.uid);
                var currentUserUid = $stateParams.uid || $rootScope.currentUser.uid;
            }
            else{
                var currentUserUid = $stateParams.uid;
            };

            $scope.getAllFellows = function() {
              $scope.allFellows = FellowService.readFellow();
              console.log($scope.allFellows);
              console.log($scope.allFellows.length);
            };

            $scope.getCurrentFellow = function() {
                console.log($stateParams.uid, 'user_uid');
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
                if (FellowService.mentorConstraint()) {
                    $scope.sendMail();
                }
            };

            $scope.sendMail = function() {
                var paramsFellow = angular.copy($scope.fellowData);
                delete paramsFellow.$id;
                delete paramsFellow.$priority;
                console.log(paramsFellow, 'rackCity');
                $http.post('/mail/user/1', paramsFellow).success(function(r) {
                    console.log(r);
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
            // $scope.mentorData = {};
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
