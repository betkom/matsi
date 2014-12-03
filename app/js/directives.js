angular.module("matsi.directives", ['firebase', 'ngCookies'])
    .directive('mentorRequest', function () {
        return {
            restrict: 'E',
            templateUrl: '/pages/mentor-request.html',
            controller: ['$scope' ,'MentorService', 'FellowService', function ($scope, MentorService, FellowService) {
                
                $scope.mentorData = MentorService.readSingleMentor($scope.mentor_uid,function(value){
                    $scope.mentor.uid = value.uid;
                });
                //$scope.mentor = {};
                $scope.accept = function() {
                console.log($scope.mentor);
                    FellowService.acceptRequest($scope.mentor);
                };
                $scope.reject = function(){
                    console.log($scope.mentor);
                    FellowService.rejectRequest($scope.mentor);
                    console.log($scope.mentor.message);
                    $scope.showMessageBox = true;
                };
                $scope.showBox =function(){
                    $scope.showMessageBox = false;
                }
            }]
        };
    })
    .directive('header', function() {
        return {
            restrict: 'E',
            controller: ['$rootScope', '$scope', '$firebase', '$cookies', 'FellowService', '$http',
                function($rootScope, $scope, $firebase, $cookies, FellowService, $http) {
                    var rootRef = new Firebase($cookies.rootRef);
                    // Start with no user logged in
                    $rootScope.currentUser = null;
                    $rootScope.allowUser = false;
                    rootRef.onAuth(function(authData) {
                        if (authData) {
                            console.log("auth: user is logged in");
                            var user = buildUserObjectFromGoogle(authData);
                            console.log(user, 'isUser');
                            var userRef = rootRef.child('users').child(user.uid);
                             $rootScope.currentUser = user;
                            userRef.on('value', function(snap) {
                                if (!snap.val()) {
                                    user.created = Firebase.ServerValue.TIMESTAMP;
                                    user.isAdmin = false;
                                    user.role = user.email.indexOf('@andela.co') > -1 ? '-fellow-' : '-mentor-';
                                    user.disabled = !(user.role === "-fellow-");
                                    if ($rootScope.currentUser.disabled) {
                                        userRef.set(user);
                                        sendMail($rootScope.currentUser, $http);
                                    } else {
                                        user.isMentored = false;
                                        userRef.set(user);
                                        $rootScope.currentUser = user;
                                    }
                                } else {
                                    $rootScope.currentUser = snap.val();
                                    if ($rootScope.currentUser.disabled) {
                                        $rootScope.allowUser = true;
                                        $rootScope.currentUser = null;
                                        console.log('user FOH');
                                        rootRef.unauth();
                                    }
                                }
                            });
                        } else {
                            // user is logged out
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

function sendMail(value, $http) {
    var paramsMentor = angular.copy(value);
    delete paramsMentor.$id;
    delete paramsMentor.$priority;
    $http.post('/mail/user/2', paramsMentor);
};
