angular.module("matsi.directives", ['firebase', 'ngCookies'])
    .directive('mentorRequest', function() {
        return {
            restrict: 'E',
            templateUrl: '/pages/mentor-request.html',
            controller: ['$scope', 'MentorService', 'FellowService', function($scope, MentorService, FellowService) {

                $scope.mentorData = MentorService.readSingleMentor($scope.mentor_uid, function(value) {
                    $scope.mentor.uid = value.uid;
                });
                $scope.accept = function() {
                    console.log($scope.mentor);
                    FellowService.acceptRequest($scope.mentor);
                };
                $scope.reject = function() {
                    console.log($scope.mentor);
                    FellowService.rejectRequest($scope.mentor);
                    console.log($scope.mentor.message);
                    $scope.showMessageBox = true;
                };
                $scope.showBox = function() {
                    $scope.showMessageBox = false;
                };
            }]
        };
    })
    .directive('header', function() {
        return {
            restrict: 'E',
            controller: ['$rootScope', '$scope', '$firebase', '$cookies', 'FellowService', 'AuthService', '$timeout',
                function($rootScope, $scope, $firebase, $cookies, FellowService, AuthService, $timeout) {
                    var rootRef = new Firebase($cookies.rootRef);
                    // Start with no user logged in
                    $rootScope.currentUser = null;
                    $rootScope.allowUser = false;
                    rootRef.onAuth(function(authData) {
                        if (authData) {
                            console.log("auth: user is logged in");
                            var user = buildUserObjectFromGoogle(authData);
                            var userRef = rootRef.child('users').child(user.uid);
                            $rootScope.currentUser = user;
                            userRef.on('value', function(snap) {
                                if (!snap.val()) {
                                    console.log("am here no val");
                                    user.created = Firebase.ServerValue.TIMESTAMP;
                                    user.isAdmin = false;
                                    user.role = user.email.indexOf('@andela.co') > -1 ? '-fellow-' : '-mentor-';
                                    user.disabled = !(user.role === "-fellow-");
                                    if (!user.disabled)
                                        user.isMentored = false;
                                    else
                                        AuthService.sendMail(2, user);
                                    userRef.set(user);
                                } else {
                                    console.log(snap.val(), "this is snap");
                                    user = snap.val();
                                    AuthService.user = snap.val();
                                    console.log(snap.val(), "this is root");
                                    if (user.disabled) {
                                        user = null;
                                        console.log('user FOH');
                                        rootRef.unauth();
                                    }
                                }
                                $timeout(function() {
                                    $rootScope.currentUser = user;
                                }, 1);
                            });
                        } else {
                            $rootScope.currentUser = null;
                            AuthService.user = null;
                        }
                    });
                    $scope.login = function() {
                        options = {
                            remember: false,
                            scope: "email"
                        };
                        rootRef.authWithOAuthRedirect("google", function(err, authData) {
                            if (err) {
                                alert('error logging in');
                            } else {
                                alert('login successful');
                            }
                        }, options);
                    };
                    $scope.logout = function() {
                        rootRef.unauth();
                        window.location.pathname = "/";
                    };
                }
            ]
        };
    });

function buildUserObjectFromGoogle(authData) {
    return {
        uid: authData.uid,
        fullName: authData.google.displayName,
        email: authData.google.email,
        accessToken: authData.google.accessToken,
        firstName: authData.google.cachedUserProfile.given_name,
        lastName: authData.google.cachedUserProfile.family_name,
        picture: authData.google.cachedUserProfile.picture
    };
}
