angular.module("matsi.services")
    .factory('Refs',['$firebase', '$cookies', '$rootScope', function($firebase, $cookies, $rootScope) {
        
        var firebaseRef = require('../../../firebaseRef');
        var rootRef = new Firebase($cookies.rootRef || firebaseRef.dev);
        return require('./exports/refs.js')(rootRef);
    }]);
