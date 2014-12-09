angular.module("matsi.services")
    .factory('Refs', ['$firebase', '$cookies', '$rootScope', function($firebase, $cookies, $rootScope) {
        var rootRef = new Firebase($cookies.rootRef || 'https://brilliant-heat-9512.firebaseio.com/');
        return {
          rootRef: rootRef,
          userRef: rootRef.child('users')
        };
    }]);
