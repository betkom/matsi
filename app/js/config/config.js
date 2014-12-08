window.Matsi = angular.module("Matsi", [
    'matsi.controllers',
    'matsi.services',
    'matsi.directives',
    'ngAnimate',
    'ngMaterial',
    'ui.router'
]);
Matsi.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $rootScope) {
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'pages/home.html',
            controller: '',
            data: {
                access: 'public'
            }
        })
        .state('edit/fellow', {
            url: '/fellows/:uid/edit',
            templateUrl: 'pages/edit-fellow.html',
            controller: 'FellowController',

            data: {
                access: 'private',
                authorizedRoles: [false],
                authenticate: true
            }
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'pages/my-profile.html',
            controller: '',
            data: {
                access: 'private'
            }
        })
        .state('fellow', {
            url: '/fellows/:uid',
            templateUrl: 'pages/fellow.html',
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
        .state('edit/mentor', {
            url: '/mentors/:uid/edit',
            templateUrl: 'pages/edit-mentor.html',
            controller: 'MentorController',
            data: {
                access: 'private'
            }
        })
        .state('mentor', {
            url: '/mentors/:uid',
            templateUrl: 'pages/mentor.html',
            controller: 'MentorController',
            data: {
                access: 'private'
            }
        })
        .state('mentors', {
            url: '/mentors',
            templateUrl: 'pages/mentors.html',
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
    $urlRouterProvider.otherwise("/");

}]);
