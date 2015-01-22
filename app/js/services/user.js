angular.module("matsi.services")
  .factory('User', ['$firebase', '$rootScope', 'Refs', function($firebase, $rootScope, Refs) {
    return require('./exports/user')($firebase,$rootScope,Refs);
  }]);
