angular.module("matsi.controllers", ['firebase', 'ngCookies'])
    .controller('HomeController', ['$rootScope', '$scope', '$mdSidenav', '$location', '$state', 'FellowService',
        function($rootScope, $scope, $mdSidenav, $location, $state, FellowService) {

        }
    ])
    .controller("FellowController", ['$rootScope', '$scope', '$cookies', 'FellowService', '$http', '$stateParams', 'MentorService', 'MailService',
        function($rootScope, $scope, $cookies, FellowService, $http, $stateParams, MentorService, MailService) {
            console.log($rootScope, "this is root");
            console.log($rootScope.currentUser, "this is val");
            if ($rootScope.currentUser.uid) {
                var currentUserUid = $stateParams.uid || $rootScope.currentUser.uid;
                console.log($rootScope.currentUser.uid, 'from tolu');
            } else {
                var currentUserUid = $stateParams.uid;
            }
            $scope.getAllFellows = function() {
                $scope.allFellows = FellowService.readFellow();
                console.log($scope.allFellows);
                console.log($scope.allFellows.length);
            };

            $scope.getCurrentFellow = function() {
                console.log($scope.fellowData, 'Tolu was here');
                $scope.fellowData = FellowService.readSingleFellow(currentUserUid);
                this.showMessageBox = true;
            };

            $scope.submitFellow = function() {
                FellowService.updateFellow($scope.fellowData);
            };

            $scope.showBox1 = function() {
                $scope.showMessageBox = false;
            };

            $scope.mentorConstraints = function() {
                FellowService.mentorConstraint(function(responseData) {

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
                MailService.send(1, $scope.fellowData);
                $scope.sendRequests();
            };

            $scope.sendRequests = function() {
                FellowService.regRequest($scope.fellowData);
            };
        }
    ])
    .controller("MentorController", ['$rootScope', '$scope', '$cookies', 'MentorService', '$stateParams', '$location',
        function($rootScope, $scope, $cookies, MentorService, $stateParams, $location) {
            $scope.mentorData = {};
            $scope.mentors = [];

            if ($rootScope.currentUser.uid) {
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
