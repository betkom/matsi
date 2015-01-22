angular.module("matsi.services")
  .factory('User', ['Refs', '$rootScope', '$firebase', function(Refs, $rootScope, $firebase) {
    return require('./exports/user')(Refs, $rootScope, $firebase);
  }]);
