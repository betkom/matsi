angular.module("matsi.services")
	.factory('utils', ['$rootScope', '$mdToast', function($rootScope,$mdToast){
		return require('./exports/utils')($rootScope,$mdToast);
	}]);
