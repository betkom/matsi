angular.module("matsi.services")
  .factory('Mentor', ['$firebaseObject','$firebaseArray', '$rootScope','Refs', function($firebaseObject,$firebaseArray, $rootScope, Refs) {
      return require('./exports/mentor')(Refs,$rootScope,$firebaseObject, $firebaseArray);
}]);
