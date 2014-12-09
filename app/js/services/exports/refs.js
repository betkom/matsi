angular.module("matsi.services")
    .factory('Refs', ['$firebase', '$cookies', '$rootScope', function($firebase, $cookies, $rootScope) {
        var rootRef = new Firebase($cookies.rootRef);
        return {
          rootRef: rootRef,
          userRef: rootRef.child('users')
        };
    }]);
