angular.module("matsi.controllers", ['firebase', 'ngCookies'])
    .controller("FellowController", ['$rootScope', '$scope', '$cookies', 'FellowService', '$http', '$stateParams', 'MentorService', 'MailService',
        function($rootScope, $scope, $cookies, FellowService, $http, $stateParams, MentorService, MailService) {
            if ($rootScope.currentUser) {
                var currentUserUid = $stateParams.uid || $rootScope.currentUser.uid;
            } else {
                var currentUserUid = $stateParams.uid;
            }
            $scope.getAllFellows = function() {
                $scope.allFellows = FellowService.readFellow();
            };

            $scope.getCurrentFellow = function() {
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
                $scope.fellowData.reason = $scope.requestMentorshipMsg 
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
            if ($rootScope.currentUser ) {
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
