angular.module("matsi.controllers", ['firebase', 'ngCookies'])
    .controller('HomeController', ['$rootScope', '$scope', '$mdSidenav', '$location', '$state', 'FellowService',
        function($rootScope, $scope, $mdSidenav, $location, $state, FellowService) {

}])
.controller("FellowController",['$rootScope', '$scope', '$firebase', '$cookies', 'FellowService',
       function($rootScope, $scope, $firebase, $cookies, FellowService) {
      var rootRef = new Firebase($cookies.rootRef);
      $scope.rootRef = new Firebase($cookies.rootRef);

    $scope.fellowData = {};
    $scope.submitFellow = function(data){
    FellowService.updateFellow(data,$rootScope.currentUser.uid);
  };

}]) 
.controller("MainCtrl", ['$rootScope', '$scope', '$firebase', '$cookies', 'FellowService',
        function($rootScope, $scope, $firebase, $cookies, FellowService) {

            var rootRef = new Firebase($cookies.rootRef);
            $scope.rootRef = new Firebase($cookies.rootRef);
            // Start with no user logged in
            $rootScope.currentUser = null;

            rootRef.onAuth(function(authData) {
                if (authData) {
                    console.log("auth: user is logged in");
                    var user = buildUserObjectFromGoogle(authData);
                    $rootScope.currentUser = user;
                    var usersRef = rootRef.child('users');
                    var userRef = usersRef.child(user.uid);
                    userRef.on('value', function(snap) {
                        if (!snap.val()) {
                            user.created = Firebase.ServerValue.TIMESTAMP;
                            user.isAdmin = false;
                            user.role = user.email.indexOf('@andela.co') > -1 ? '-fellow-' : '-mentor-';

                            user.disabled = !user.isFellow;
                            userRef.set(user);
                            $rootScope.currentUser = user;
                        } else
                            $rootScope.currentUser = snap.val();
                    });
                } else {
                    // user is logged out
                    console.log("auth: user is logged out");
                    $rootScope.currentUser = null;
                }
            });
            $scope.login = function() {
                //analytics.track('Login');  
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
            MentorService.readSingleMentor($rootScope.currentUser.uid);

            $scope.submitMentor = function(data) {
                if (document.getElementById('Agree').checked) {
                    MentorService.updateMentor(data, $rootScope.currentUser.uid);
                } else {
                    alert('You must agree to the Terms')
                }
            };

        }
    ]);
function buildUserObjectFromGoogle(authData) {
    return {
        uid: authData.uid,
        name: authData.google.displayName,
        email: authData.google.email,
        accessToken: authData.google.accessToken,
        firstName: authData.google.cachedUserProfile.given_name,
        lastName: authData.google.cachedUserProfile.family_name,
        picture: authData.google.cachedUserProfile.picture
    }
};
