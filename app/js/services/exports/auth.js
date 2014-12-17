module.exports = function(Refs, $firebase, $rootScope, $state, $timeout, MailService) {
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
    return {
        onAuth: function() {
            $rootScope.currentUser = null;
            $rootScope.allowUser = false;
            Refs.rootRef.onAuth(function(authData) {
                if (authData) {
                    var user = buildUserObjectFromGoogle(authData);
                    //var userRef = rootRef.child('users').child(user.uid);
                    $rootScope.currentUser = user;
                    Refs.userRef.child(user.uid).on('value', function(snap) {
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
                            Refs.userRef.set(user);

                        } else {
                            user = snap.val();
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
        },
        login: function() {
            var options = {
                remember: false,
                scope: "email"
            };
            Refs.rootRef.authWithOAuthRedirect("google", function(err, authData) {
                if (err) {
                    alert('error logging in');
                } else {
                    alert('login successful');
                }
            }, options);
        },
        logout: function() {
            Refs.rootRef.unauth();
            $state.go('home');
        }


    };
};
