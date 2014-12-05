angular.module("matsi.directives")
    .directive('header', function() {
        return {
            restrict: 'E',
            controller: ['$rootScope', '$scope', '$firebase', '$cookies', 'FellowService', '$http','MailService', '$timeout',
                function($rootScope, $scope, $firebase, $cookies, FellowService, $http, MailService, $timeout) {
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
                                    user.disabled = !(user.role === "-fellow-");
                                    if(!user.disabled)
                                      user.isMentored = false;
                                    else
                                      MailService.send(2,user);
                                    userRef.set(user);
                                    $rootScope.allowUser = true;
                                } else {
                                    user = snap.val();
                                    if (user.disabled) {
                                        user = null;
                                        rootRef.unauth();
                                    }
                                }
                                $timeout(function(){
                                  $rootScope.currentUser = user;
                                },1);
                            });
                        } else {
                            console.log("auth: user is logged out");
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
            ]
        }
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
    }
};
