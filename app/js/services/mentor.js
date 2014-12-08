angular.module("matsi.services")
  .factory('MentorService', ['$firebase', '$cookies', '$stateParams', '$rootScope', function($firebase, $cookies, $stateParams, $rootScope) {
      var rootRef = new Firebase($cookies.rootRef);
      return require('./exports/mentor')(rootRef,$firebase);
}]);
