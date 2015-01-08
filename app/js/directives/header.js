angular.module("matsi.directives")
    .directive('header', function() {
        return {
            restrict: 'E',
            controller: ['$rootScope', '$scope', '$firebase', '$cookies', 'Fellow', '$timeout', '$stateParams', '$location', 'MailService', '$state', 'Refs',
                function($rootScope, $scope, $firebase, $cookies, Fellow, $timeout, $stateParams, $location, MailService, $state, Refs) {
                    var rootRef = new Firebase($cookies.rootRef);



                    $rootScope.currentUser = null;
                    $rootScope.allowUser = false;
                    $scope.auth = function() {
                        Refs.rootRef.onAuth(function(authData) {
                            if (authData) {
                                var user = buildUserObjectFromGoogle(authData);
                                $rootScope.currentUser = user;
                                console.log($rootScope.currentUser, 'User');
                                Refs.userRef.child(user.uid).once('value', function(snap) {
                                    if (!snap.val()) {
                                        user.created = Firebase.ServerValue.TIMESTAMP;
                                        user.isAdmin = false;
                                        user.role = user.email.indexOf('@andela.co') > -1 ? '-fellow-' : '-mentor-';
                                        if (user.role === '-mentor-') {
                                            $rootScope.allowUser = true;
                                            user.disabled = user.role !== "-fellow-";
                                        }
                                        if (!user.disabled) {
                                            user.isMentored = false;
                                            user.removed = false;
                                        } else {
                                            MailService.send(2, user);
                                        }
                                        Refs.userRef.child(user.uid).set(user);
                                        $location.path('fellows/' + user.uid +'/edit');

                                    } else {
                                        user = snap.val();
                                        user.picture = authData.google.cachedUserProfile.picture;
                                        rootRef.child('users').child(user.uid).update({picture:user.picture});
                                        if (user.disabled || user.removed) {
                                            user = null;
                                            Refs.rootRef.unauth();
                                        }
                                    }
                                    $timeout(function() {

                                        $rootScope.currentUser = user;
                                        if ($rootScope.currentUser.requests) {
                                            $scope.notifications = Object.keys($rootScope.currentUser.requests).length;
                                        }

                                    }, 1);
                                });
                            } else {
                                $rootScope.currentUser = null;
                            }
                        });
                    };
                    // Start with no user logged in
                    $scope.login = function() {
                        var options = {
                            remember: false,
                            scope: "email"
                        };
                        Refs.rootRef.authWithOAuthRedirect("google", function(err, authData) {
                            if (err) {
                                alert('error logging in');
                            } else {
                                alert('login successful');
                                console.log(authData);
                                $rootScope.currentUser.picture = authData.picture;
                            }
                        }, options);
                    };
                    $scope.logout = function() {
                        Refs.rootRef.unauth();
                        $state.go('home');
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
                    $scope.auth();
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
