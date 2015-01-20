angular.module("matsi.services")
  .factory('Fellow', ['$firebase', '$rootScope', 'Refs', '$http', function($firebase, $rootScope, Refs, $http) {
    return require('./exports/fellow')(Refs,$rootScope,$firebase,$http);
  }]);
