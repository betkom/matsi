module.exports = function($rootScope, $mdToast, $mdDialog) {
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
    showConfirm: function(ev) {
      var confirm = $mdDialog.confirm()
        .title('Terms and Condition Agreement')
        .content('Do you agree to our Terms and conditions?')
        .ariaLabel('Lucky day')
        .ok('I Agree')
        .cancel('I disagree')
        .targetEvent(ev);
    }
  };
};
