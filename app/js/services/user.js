angular.module("matsi.services")
  .factory('User', ['Refs', '$rootScope', '$firebaseObject', '$firebaseArray', function(Refs, $rootScope, $firebaseObject, $firebaseArray) {
    return require('./exports/user')(Refs, $rootScope, $firebaseObject, $firebaseArray);
  }]);
