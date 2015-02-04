'use strict';

angular.module('matsi.controllers')
.controller('UserCtrl', ['$rootScope', '$scope', '$cookies', '$http', '$stateParams', 'User',
  function($rootScope, $scope, $cookies, $http, $stateParams, User) {
    // $scope.showUser = true;
    User.all().$loaded(function(data){
      $scope.users = data;
      angular.forEach(data, function(user, index){
        var str;
        if(user.role === '-mentor-'){
          str = 'mentors';
        } else {
          str = 'fellows';
        }
        user.role = str;
      });
  });       
}]);