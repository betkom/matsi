angular.module("matsi.controllers")
    .controller("MentorCtrl", ['$rootScope', '$scope', '$cookies', 'Mentor', '$stateParams', '$location',
        function($rootScope, $scope, $cookies, Mentor, $stateParams, $location) {
            $scope.checked = false;
            $scope.toggleCheck = function() {
                $scope.checked = !$scope.checked;
            };

            $scope.findOne = function() {
                var uid = $rootScope.currentUser ? ($stateParams.uid || $rootScope.currentUser.uid) : $stateParams.uid;
                $scope.mentor = Mentor.findOne(uid);
            };
            $scope.all = function() {
                $scope.mentors = Mentor.all();
            };
            $scope.disabled = function() {
                $scope.mentors = Mentor.disabled();
                console.log($scope.mentors);
            };
            $scope.enable = function(mentor) {
                Mentor.enable(mentor);
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
        }
    ]);
