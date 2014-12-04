require("./js/config/config.js");
require("./js/controllers/MentorController.js");
require("./js/controllers/FellowController.js");
require("./js/directives/mentorRequest.js");
require("./js/directives/header.js");
require("./js/services.js");

Matsi.run(['$rootScope', function($rootScope) {
    // set globals we want available in ng expressions
    $rootScope._ = window._;
    $rootScope.moment = window.moment;
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
