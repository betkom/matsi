require("./js/controllers.js");
require("./js/directives.js");
require("./js/services.js");

window.Matsi = angular.module("Matsi", [
    'matsi.controllers',
    'matsi.services',
    'matsi.directives',
    'ngAnimate',
    'ngMaterial',
    'ui.router'
]);

Matsi.run(['$rootScope', function($rootScope) {
    // set globals we want available in ng expressions
    $rootScope._ = window._;
    $rootScope.moment = window.moment;
}]);

if (window.location.toString().indexOf('#&__firebase_request_key') > -1) {
    window.location = '/';
}


Matsi.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'pages/home.html',
            controller: 'MainCtrl',
            data: {
                access: 'public'
            }
        })
        .state('updateFellowProfile', {
            url: '/updateFellowProfile',
            templateUrl: 'pages/updateFellowProfile.html',
            controller: 'FellowController',
            data: {
                access: 'private'
            }
        })
        .state('myProfile', {
            url: '/myProfile',
            templateUrl: 'pages/myProfile.html',
            controller: '',
            data: {
                access: 'private'
            }
        })
        .state('fellowProfile', {
            url: '/fellowProfile/:uid',
            templateUrl: 'pages/fellowProfile.html',
            controller: 'FellowController',
            data: {
                access: 'private'
            }
        })
        .state('fellows', {
            url: '/fellows',
            templateUrl: 'pages/fellows.html',
            controller: 'FellowController',
            data: {
                access: 'private'
            }
        })
        .state('editMentor', {
            url: '/editMentor',
            templateUrl: 'pages/editMentor.html',
            controller: 'MentorController',
            data: {
                access: 'private'
            }
        })
        .state('findOneMentor', {
            url: '/mentors/:uid',
            templateUrl: 'pages/viewMentor.html',
            controller: 'MentorController',
            data: {
                access: 'private'
            }
        })
        .state('findAllMentors', {
            url: '/mentors',
            templateUrl: 'pages/viewAllMentors.html',
            controller: 'MentorController',
            data: {
                access: 'private'
            }
        })
        .state('settings', {
            url: '/settings',
            templateUrl: 'pages/settings.html',
            controller: 'SettingsController',
            data: {
                access: 'private'
            }
        });

}]);

window.escapeEmailAddress = function(email) {
    if (!email) {
        return false;
    }

    // Replace '.' (not allowed in a Firebase key) with ',' (not allowed in an email address)
    email = email.toLowerCase();
    email = email.replace(/\./g, ',');
    return email;
};
