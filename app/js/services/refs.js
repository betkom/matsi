angular.module("matsi.services")
    .factory('Refs',['$firebase', '$cookies', '$rootScope', function($firebase, $cookies, $rootScope) {
        
        var firebaseRef = require('../../../firebase-ref');
        var rootRef = new Firebase($cookies.rootRef || firebaseRef.dev);
        return require('./exports/refs.js')(rootRef);
    }]);
