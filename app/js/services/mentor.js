angular.module("matsi.services")
  .factory('MentorService', ['$firebase', '$cookies', '$rootScope', function($firebase, $cookies, $rootScope) {
      var rootRef = new Firebase($cookies.rootRef);
      return require('./exports/mentor')(rootRef,$rootScope,$firebase);
}]);
