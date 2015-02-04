(function() {
    'use strict';
    angular.module('matsi.services', ['firebase', 'ngCookies']);
    angular.module('matsi.controllers', ['firebase', 'ngCookies', 'ngSanitize', 'angularFileUpload', 'ui.bootstrap']);
    angular.module('matsi.directives', ['firebase', 'ngCookies']);

    require('./js/config/config.js');

    require('./js/services/refs.js');
    require('./js/services/mentor.js');
    require('./js/services/fellow.js');
    require('./js/services/mail.js');
    require('./js/services/log.js');
    require('./js/services/levels.js');
    require('./js/services/user.js');

    require('./js/services/utils.js');

    require('./js/controllers/mentor.js');
    require('./js/controllers/fellow.js');
    require('./js/controllers/levels.js');
    require('./js/controllers/user.js');

    require('./js/directives/mentor-request.js');
    require('./js/directives/my-connections.js');
    require('./js/directives/notification.js');
    require('./js/directives/header.js');

    Matsi.run(['$rootScope', function($rootScope) {
        // set globals we want available in ng expressions
        $rootScope._ = window._;
        $rootScope.moment = window.moment;
    }]);
    if (window.location.toString().indexOf('#&__firebase_request_key') > -1) {
        window.location = '/';
    }

})();
