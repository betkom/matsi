angular.module("matsi.services")
	.factory('utils', ['$rootScope', '$mdToast', '$mdDialog', function($rootScope,$mdToast,$mdDialog){
		return require('./exports/utils')($rootScope,$mdToast,$mdDialog);
	}]);
