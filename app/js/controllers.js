angular.module("matsi.controllers", ['firebase', 'ngCookies'])
    .controller('HomeController', ['$rootScope', '$scope', '$mdSidenav', '$location', '$state', 'FellowService',
        function($rootScope, $scope, $mdSidenav, $location, $state, FellowService) {

        }
    ])
    .controller("FellowController", ['$rootScope', '$scope', '$firebase', '$cookies', 'FellowService', '$http', 'MentorService',
        function($rootScope, $scope, $firebase, $cookies, FellowService, $http, MentorService) {
            var rootRef = new Firebase($cookies.rootRef);
            $scope.rootRef = new Firebase($cookies.rootRef);

            $scope.submitFellow = function() {
                FellowService.updateFellow($scope.fellowData, $rootScope.currentUser.uid);

            };
            $scope.fellowData = FellowService.readMyProfile($rootScope.currentUser.uid);
            console.log($scope.fellowData);
            $scope.allFellows = FellowService.readFellow();
            console.log($scope.allFellows);

            $scope.sendMail = function() {
                var paramsFellow = angular.copy($scope.fellowData);
                delete paramsFellow.$id;
                delete paramsFellow.$priority;

                console.log(paramsFellow, 'rackCity');
                //var paramsMentor = MentorService.readSingleMentor();
                $http.post('/mail/user/1', paramsFellow).success(function(r) {
                    console.log(r);
                }); // $http({
                //     method:'POST',
                // url: '/mail/user/1',
                // data: {
                //   body:$scope.fellowData
                //      }
                // });

            };
        }
    ])
    .controller("MainCtrl", ['$rootScope', '$scope', '$firebase', '$cookies', 'FellowService',
        function($rootScope, $scope, $firebase, $cookies, FellowService) {
            var rootRef = new Firebase($cookies.rootRef);
            $scope.rootRef = new Firebase($cookies.rootRef);
            // Start with no user logged in
            $rootScope.currentUser = null;
            rootRef.onAuth(function(authData) {
                if(authData) {
                var user = buildUserObjectFromGoogle(authData);
                $rootScope.currentUser = user;
                user.role = user.email.indexOf('@andela.co') > -1 ? '-fellow-' : '-mentor-';
                user.disabled = !(user.role === "-fellow-");
                $scope.allowUser = !user.disabled;

                if (authData && $scope.allowUser) {
                    console.log("auth: user is logged in");

                    var usersRef = rootRef.child('users');
                    var userRef = usersRef.child(user.uid);
                    userRef.on('value', function(snap) {
                        if (!snap.val()) {
                            user.created = Firebase.ServerValue.TIMESTAMP;
                            user.isAdmin = false;

                            userRef.set(user);
                            $rootScope.currentUser = user;
                        } else
                            $rootScope.currentUser = snap.val();
                    });
                } else {
                    // user is logged out
                    console.log("auth: user is logged out");
                    $rootScope.currentUser = null;
                }}
            });
            $scope.login = function() {
                options = {
                    remember: true,
                    scope: "email"
                };
                rootRef.authWithOAuthRedirect("google", function(err, authData) {
                    if (err) {
                        console.log('error logging in', err);
                    } else {
                        console.log('login successful');
                    }
                }, options);
            }
            $scope.logout = function() {
                rootRef.unauth();
                window.location.pathname = "/";
            };
        }
    ])
    .controller("MentorController", ['$rootScope', '$scope', '$firebase', '$cookies', 'MentorService',
        function($rootScope, $scope, $firebase, $cookies, MentorService) {
            $scope.mentorData = {};
            $scope.mentors = [];
            $scope.mentors = MentorService.readMentor();
            $scope.mentorData = MentorService.readMyProfile($rootScope.currentUser.uid);
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

function buildUserObjectFromGoogle(authData) {
    return {
        uid: authData.uid,
        fullName: authData.google.displayName,
        email: authData.google.email,
        accessToken: authData.google.accessToken,
        firstName: authData.google.cachedUserProfile.given_name,
        lastName: authData.google.cachedUserProfile.family_name,
        picture: authData.google.cachedUserProfile.picture
    }
};
