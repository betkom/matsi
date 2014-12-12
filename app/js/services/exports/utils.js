module.exports = function($rootScope, $mdToast){
	return {
        openToast: function(message) {
            $mdToast.show($mdToast.simple().content(message));
        }
	}
}