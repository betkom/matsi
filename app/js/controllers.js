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
            };

            $scope.getCurrentFellow = function() {
                //console.log($stateParams.uid, 'user_uid');u
                console.log($scope.fellowData, 'Tolu was here');
                $scope.fellowData = FellowService.readSingleFellow(currentUserUid);
                this.showMessageBox = true;
            };

            $scope.submitFellow = function() {
                FellowService.updateFellow($scope.fellowData, $rootScope.currentUser.uid);
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
                MailService.send(1,$scope.fellowData);
                $scope.sendRequests();
            };
            
            $scope.sendRequests = function() {
                FellowService.regRequest($scope.fellowData);
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
            // console.log($rootScope.currentUser,"ghgvhvvjvhgghv");
            $scope.mentorData = {};
            $scope.mentors = [];

            if ($rootScope.currentUser.uid) {
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
