'use strict';


angular.module('matsi.directives')
  .directive('header', function() {
    return {
      restrict: 'E',
      controller: 'HeaderCtrl'
    };
  })
  .controller('HeaderCtrl', ['$rootScope', '$scope', '$firebaseAuth', '$cookies', 'Fellow', '$timeout', '$stateParams', '$location', 'MailService', '$state', 'Refs', 'Utils', '$mdDialog', '$mdToast',
    function($rootScope, $scope, $firebaseAuth, $cookies, Fellow, $timeout, $stateParams, $location, MailService, $state, Refs, Utils, $mdDialog, $mdToast) {
      $rootScope.currentUser = null;
      $rootScope.allowUser = false;
      
      var provider = new firebase.auth.GoogleAuthProvider();
      var authUs = $firebaseAuth();
      
     
      $scope.auth = function() {
        console.log(authUs, 'authUs');
        authUs.$onAuthStateChanged(function(authData) {
          console.log(authData, 'data')
          if (authData) {
            var user = buildUserObjectFromGoogle(authData);
            Refs.users.child(user.uid).once('value', function(snap) {
              if (!snap.val()) {
                var confirm = $mdDialog.confirm()
                  .title('Andela Terms and Conditions')
                  .textContent("Andela will not pay any mentor, It's a voluntary position. During the period a mentor is signed up with andela, Andela reserves the right to evaluate a mentor's impact on its fellows and the performance of a fellow and therefore reserves the right to terminate a mentor's or a fellow's account. If you are satisfied with the conditions, click 'I Agree'")
                  .ariaLabel('Lucky day')
                  .ok('I Agree')
                  .cancel('I disagree');
                $mdDialog.show(confirm).then(function() {
                    user.created = firebase.database.ServerValue.TIMESTAMP;
                    user.isAdmin = false;
                    user.role = '-fellow-'
                    // user.role = user.email.indexOf('@andela.co') > -1 ? '-fellow-' : '-mentor-';
                    if (user.role === '-mentor-') {
                      user.disabled = false
                      // user.disabled = user.role !== "-fellow-";
                    }
                    if (!user.disabled) {
                      user.isMentored = false;
                      user.removed = false;
                    } else {
                      MailService.send(2, user);
                    }
                    Refs.users.child(user.uid).set(user);
                    $location.path('fellows/' + user.uid + '/edit');
                    Utils.setUser(user, $scope);

                  }, function(err){
                    $mdDialog.hide();
                    $scope.logout();
                  }).catch(function() {
                    $mdDialog.hide();
                    $scope.logout();
                  })
                  
              } else {
                user = snap.val();
                user.picture = authData.photoURL;
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
          scope: 'email'
        };
        authUs.$signInWithPopup(provider, function(err, authData) {
          if (err) {
            alert('error logging in');
          } else {
            alert('login successful');
            $rootScope.currentUser.picture = authData.picture;
          }
        });
      };
      $scope.logout = function() {
        authUs.$signOut(function() {
          console.log('in here')
          $rootScope.currentUser = null;
          $state.go('home');
        });
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
  console.log(authData.additionalUserInfo, 'add')
  return {
    uid: authData.uid,
    fullName: authData.displayName || '',
    email: authData.email,
    accessToken: authData.accessToken || '',
    firstName: authData.given_name || '',
    lastName: authData.family_name || '',
    picture: authData.photoURL || ''
  };
}
