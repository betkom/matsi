angular.module("matsi.services")
  .factory('Fellow', ['$firebaseObject', '$firebaseArray', '$rootScope', 'Refs', '$http', function($firebaseObject,$firebaseArray, $rootScope, Refs, $http) {
    return require('./exports/fellow')(Refs,$rootScope,$firebaseObject,$firebaseArray,$http);
  }]);
