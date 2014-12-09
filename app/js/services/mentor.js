angular.module("matsi.services")
  .factory('MentorService', ['$firebase', '$rootScope','Refs', function($firebase, $rootScope, Refs) {
      return require('./exports/mentor')(Refs.rootRef,$rootScope,$firebase);
}]);
