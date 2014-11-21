angular.module("matsi.controllers", ['firebase','ngCookies'])
.controller('HomeController',['$rootScope', '$scope','$mdSidenav','$location','$state',
	function($rootScope, $scope,$mdSidenav,$location,$state){

	$scope.hello = function(){
		alert("CLICKED!!");
	}

}]);
