module.exports = function($rootScope, $mdToast, $mdDialog){
	return {
        openToast: function(message) {
            console.log('*********** red ribbon');
            $mdToast.show($mdToast.simple().content(message));
        },
        showAlert: function(ev,message){
			$mdDialog.show(
			    $mdDialog.alert()
			    .title('Oops, request not sent!!!')
			    .content(message)
			    .ok('Okay!')
			    .targetEvent(ev)
			);
        }
	};
};