angular.module("matsi.services")
.factory('Log', ['$firebaseObject','$rootScope','Refs', function($firebaseObject,$rootScope, Refs){
    return require('./exports/log')(Refs,$rootScope,$firebaseObject);
}]);