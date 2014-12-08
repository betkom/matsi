angular.module("matsi.services")
    .factory('FellowService', ['$firebase', '$cookies', '$stateParams', '$rootScope', function($firebase, $cookies, $stateParams, $rootScope) {
        var rootRef = new Firebase($cookies.rootRef);
        return require('./exports/fellow')(rootRef,$rootScope,$firebase);
    }]);
