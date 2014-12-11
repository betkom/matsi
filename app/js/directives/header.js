angular.module("matsi.directives")
    .directive('header', function() {
        return {
            restrict: 'E',
            controller: ['$rootScope', '$scope', '$firebase', '$cookies', 'Fellow', '$timeout', '$stateParams', '$location', 'MailService',
                function($rootScope, $scope, $firebase, $cookies, Fellow, $timeout, $stateParams, $location, MailService) {
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
                                    user.created = Firebase.ServerValue.TIMESTAMP;
                                    user.isAdmin = false;
                                    user.role = user.email.indexOf('@andela.co') > -1 ? '-fellow-' : '-mentor-';
                                    user.disabled = user.role !== "-fellow-";
                                    if (!user.disabled) {
                                        user.isMentored = false;
                                    } else {
                                        MailService.send(2, user);
                                    }
                                    userRef.set(user);
                                    $rootScope.allowUser = true;
                                } else {
                                    user = snap.val();
                                    if (user.disabled) {
                                        user = null;
                                        rootRef.unauth();
                                    }
                                }
                                $timeout(function() {
                                    $rootScope.currentUser = user;
                                    if ($rootScope.currentUser.requests) {
                                        $scope.notifications = Object.keys($rootScope.currentUser.requests).length;
                                    };

                                }, 1);
                            });
                        } else {
                            $rootScope.currentUser = null;
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
                    $scope.profile = function(val) {
                        if ($rootScope.currentUser.role === '-fellow-') {
                            $location.path('fellows/' + $rootScope.currentUser.uid);
                        } else {
                            $location.path('mentors/' + $rootScope.currentUser.uid);
                        }
                    };
                    $scope.editProfile = function(val) {
                        if ($rootScope.currentUser.role === '-fellow-') {
                            $location.path('fellows/' + $rootScope.currentUser.uid + '/edit');
                        } else {
                            $location.path('mentors/' + $rootScope.currentUser.uid + '/edit');
                        }
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
