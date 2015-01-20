angular.module("matsi.services")
  .factory('Mentor', ['$firebase', '$rootScope','Refs', function($firebase, $rootScope, Refs) {
      return require('./exports/mentor')(Refs,$rootScope,$firebase);
}]);
