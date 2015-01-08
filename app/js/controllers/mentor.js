angular.module("matsi.controllers")
    .controller("MentorCtrl", ['$rootScope', '$scope', '$cookies', 'Mentor', '$stateParams', '$location', 'MailService',
        function($rootScope, $scope, $cookies, Mentor, $stateParams, $location, MailService) {
            $scope.checked = false;
            $scope.toggleCheck = function() {
                $scope.checked = !$scope.checked;
            };

            var start = 0,
                end = 0,
                currentPage = 0,
                numPerPage = 16,
                mentors = [],
                lastIndexOfMentors = 0;
            $scope.pageCount = [];

            $scope.shuffle = function(next) {
                if (!next) {
                    if (currentPage > 0) {
                        currentPage--;
                        mentorsFilter();
                    }
                } else {
                    if (currentPage < lastPage() - 1) {
                        currentPage++;
                        mentorsFilter();
                    }
                }
            };
            $scope.navigate = function(page) {
                currentPage = page;
                $scope.currentPage = currentPage;
                mentorsFilter();
            };

            var lastPage = function() {
                return Math.ceil(mentors.length / numPerPage);
            };

            var mentorsFilter = function() {
                start = numPerPage * currentPage;
                end = numPerPage + start;
                $scope.mentors = mentors.slice(start, end);
            };

            $scope.findOne = function() {
                var uid = $rootScope.currentUser ? ($stateParams.uid || $rootScope.currentUser.uid) : $stateParams.uid;
                $scope.mentor = Mentor.findOne(uid);
            };

            $scope.all = function(cb) {
                start = 0;
                end = numPerPage;

                var mentor = Mentor.all();
                if (mentor) {
                    mentor.$loaded(function(data) {
                        mentors = data;
                        $scope.pageCount = new Array(lastPage());
                        lastIndexOfMentors = mentors.length - 1;
                        mentorsFilter();
                        if (cb)
                            cb();
                    });
                }
            };
            $scope.delete = function(mentorId) {
                Mentor.delete(mentorId);
                //window.location.reload('mentors');
            };

            $scope.disabled = function() {
                $scope.mentors = Mentor.disabled();
            };
            $scope.enable = function(mentor) {
                Mentor.enable(mentor);
                $scope.sendMessage(mentor);
            };
            $scope.sendMessage = function(mentor) {
                console.log(mentor, 'ttttttt');
                MailService.send(5, mentor);
            };

            $scope.update = function(data) {
                if ($rootScope.currentUser.uid === $scope.mentor.uid || $rootScope.currentUser.isAdmin) {
                    Mentor.update(data, function(err) {
                        if (err !== null) {
                            $mdDialog.show(
                                $mdDialog.alert()
                                .title('Update error')
                                .content('An error occured,  try again later')
                                .ariaLabel('Password notification')
                                .ok('Okay!')
                            );
                        }
                        $location.path('mentors/' + $rootScope.currentUser.uid);
                    });
                }
            };
            $scope.mentorCheck = false;
            $scope.allCheck = false;
            $scope.checkAll = function() {
                    $scope.mentorCheck = !$scope.mentorCheck;
                    console.log($scope.mentorCheck);
                    if($scope.mentorCheck){
                        $scope.allCheck = true;
                        console.log($scope.allCheck, 'each one');
                    }else{
                        $scope.allCheck = false;
                    }
                angular.forEach($scope.mentors, function(mentor) {
                    $scope.allCheck = $scope.mentorCheck;
                console.log($scope.allCheck,'one');
                    //console.log($scope.mentorCheck);
                });
            };
            $scope.enableAll = function(mentors){
                if($scope.mentorCheck){
                    angular.forEach($scope.mentors, function(mentor){
                         Mentor.enable(mentor);
                        $scope.sendMessage(mentor);
                        console.log('enable');
                    });
                }
            };
            // $scope.toggleCheck = function(){
            //     $scope.allCheck = !$scope.allCheck;
            //     console.log($scope.allCheck);
            // };
        }
    ]);
