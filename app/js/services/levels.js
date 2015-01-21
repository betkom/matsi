angular.module("matsi.services")
  .factory('Levels', ['$firebase', '$rootScope', 'Refs', function($firebase, $rootScope, Refs) {
    return require('./exports/levels')($firebase, $rootScope, Refs);
  }]);