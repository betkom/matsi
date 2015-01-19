angular.module("matsi.services")
	.factory('Utils', ['$rootScope', '$mdToast', '$mdDialog','$timeout', function($rootScope,$mdToast,$mdDialog, $timeout){
		return require('./exports/utils')($rootScope,$mdToast,$mdDialog, $timeout);
	}]);
