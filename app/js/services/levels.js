angular.module("matsi.services")
  .factory('Levels', ['$firebase', '$rootScope', 'Refs', '$http', function($firebase, $rootScope, Refs, $http) {
    return require('./exports/levels')(Refs.rootRef,$rootScope,$firebase,$http);
  }]);