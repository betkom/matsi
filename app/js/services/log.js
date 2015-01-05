angular.module("matsi.services")
.factory('Log', ['$firebase','$rootScope','Refs', function($firebase,$rootScope, Refs){
    return require('./exports/log')(Refs.rootRef,$rootScope,$firebase);
}]);