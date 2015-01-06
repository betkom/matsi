
angular.module("matsi.services", ['firebase', 'ngCookies']);
angular.module("matsi.controllers", ['firebase', 'ngCookies']);
angular.module("matsi.directives", ['firebase', 'ngCookies']);

require("./js/config/config.js");

require("./js/services/refs.js");
require("./js/services/mentor.js");
require("./js/services/fellow.js");
require("./js/services/mail.js");
require("./js/services/log.js");

//require("./js/services/auth.js");
require("./js/services/utils.js");

require("./js/controllers/mentor.js");
require("./js/controllers/fellow.js");

require("./js/directives/mentor-request.js");
require("./js/directives/my-connections.js");
require("./js/directives/notification.js");
require("./js/directives/header.js");

Matsi.run(['$rootScope', function($rootScope) {
    // set globals we want available in ng expressions
    $rootScope._ = window._;
    $rootScope.moment = window.moment;
    // Auth.onAuth();
}]);

if (window.location.toString().indexOf('#&__firebase_request_key') > -1) {
    window.location = '/';
}
window.escapeEmailAddress = function(email) {
    if (!email) {
        return false;
    }
    // Replace '.' (not allowed in a Firebase key) with ',' (not allowed in an email address)
    email = email.toLowerCase();
    email = email.replace(/\./g, ',');
    return email;
};
