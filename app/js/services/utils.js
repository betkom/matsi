angular.module("matsi.services")
	.factory('utils', ['$rootScope', '$mdToast', '$mdDialog','$timeout', function($rootScope,$mdToast,$mdDialog, $timeout){
		return require('./exports/utils')($rootScope,$mdToast,$mdDialog, $timeout);
	}]);
