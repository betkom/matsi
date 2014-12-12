module.exports = function($rootScope, $mdToast){
	return {
        openToast: function(message) {
            console.log('*********** red ribbon');
            $mdToast.show($mdToast.simple().content(message));
        }
	}
}