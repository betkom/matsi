module.exports = function($rootScope, $mdToast, $mdDialog, $timeout) {
  return {
    openToast: function(message) {
      $mdToast.show($mdToast.simple().content(message));
    },
    showAlert: function(ev, message) {
      $mdDialog.show(
        $mdDialog.alert()
        .title('Oops, request not sent!!!')
        .content(message)
        .ok('Okay!')
        .targetEvent(ev)
      );
    },
    setTimeout: function(user) {
      $timeout(function() {
        $rootScope.currentUser = user;
        console.log($rootScope.currentUser, 'here');
        if ($rootScope.currentUser.requests) {
          $scope.notifications = Object.keys($rootScope.currentUser.requests).length;
        }

      }, 1);
    }
  };
};
