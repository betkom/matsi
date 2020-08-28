angular.module("matsi.services")
  .factory('Levels', ['$firebaseObject', '$firebaseArray', '$rootScope', 'Refs', function($firebaseObject, $firebaseArray, $rootScope, Refs) {
    return require('./exports/levels')($firebaseObject, $firebaseArray, $rootScope, Refs);
  }]);