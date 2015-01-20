angular.module("matsi.directives")
  .directive('header', function() {
    return {
      restrict: 'E',
      controller: 'HeaderCtrl'
    };
  })
  .controller('HeaderCtrl', ['$rootScope', '$scope', '$firebase', '$cookies', 'Fellow', '$timeout', '$stateParams', '$location', 'MailService', '$state', 'Refs', 'Utils', '$mdDialog', '$mdToast',
    function($rootScope, $scope, $firebase, $cookies, Fellow, $timeout, $stateParams, $location, MailService, $state, Refs, Utils, $mdDialog, $mdToast) {
      $rootScope.currentUser = null;
      $rootScope.allowUser = false;
      $scope.auth = function() {
        Refs.root.onAuth(function(authData) {
          if (authData) {
            var user = buildUserObjectFromGoogle(authData);
            Refs.users.child(user.uid).once('value', function(snap) {
              if (!snap.val()) {
                var confirm = $mdDialog.confirm()
                  .title('Andela Terms and Conditions')
                  .content("Andela will not pay any mentor, It's a voluntary position. During the period a mentor is signed up with andela, Andela reserves the right to evaluate a mentor's impact on its fellows and the performance of a fellow and therefore reserves the right to terminate a mentor's or a fellow's account. If you are satisfied with the conditions, click 'I Agree'")
                  .ariaLabel('Lucky day')
                  .ok('I Agree')
                  .cancel('I disagree');
                $mdDialog.show(confirm).then(function() {
                    user.created = Firebase.ServerValue.TIMESTAMP;
                    user.isAdmin = false;
                    user.role = user.email.indexOf('@andela.co') > -1 ? '-fellow-' : '-mentor-';
                    if (user.role === '-mentor-') {
                      user.disabled = user.role !== "-fellow-";
                    }
                    if (!user.disabled) {
                      user.isMentored = false;
                      user.removed = false;
                    } else {
                      MailService.send(2, user);
                    }
                    Refs.userRef.child(user.uid).set(user);
                    $location.path('fellows/' + user.uid + '/edit');
                    Utils.setUser(user, $scope);

                  },
                  function() {$mdDialog.hide();$scope.logout();});
              } else {
                user = snap.val();
                user.picture = authData.google.cachedUserProfile.picture;
                Refs.users.child(user.uid).update({
                  picture: user.picture
                });
                if (user.disabled || user.removed) {
                  $scope.logout();
                  $scope.allowUser = true;
                }else{
                Utils.setUser(user, $scope);
              }
              }
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
        Refs.root.authWithOAuthRedirect("google", function(err, authData) {
          if (err) {
            alert('error logging in');
          } else {
            alert('login successful');
            $rootScope.currentUser.picture = authData.picture;
          }
        }, options);
      };
      $scope.logout = function() {
        Refs.root.unauth();
        $rootScope.currentUser = null;
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
  };
}
