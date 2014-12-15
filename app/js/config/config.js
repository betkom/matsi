window.Matsi = angular.module("Matsi", [
    'matsi.controllers',
    'matsi.services',
    'matsi.directives',
    'ngAnimate',
    'ngMaterial',
    'ui.router',
    'ui.bootstrap'
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
            controller: 'FellowCtrl',

            data: {
                access: 'private',
                authorizedRoles: [false],
                authenticate: true
            }
        })
        .state('fellow', {
            url: '/fellows/:uid',
            templateUrl: 'pages/fellow.html',
            controller: 'FellowCtrl',
            data: {
                access: 'private'
            }
        })
        .state('fellow/mentors', {
            url: '/fellows/:uid/mentors',
            templateUrl: '',
            controller: 'FellowCtrl',
            data: {
                access: 'private'
            }
        })
        .state('fellows', {
            url: '/fellows',
            templateUrl: 'pages/fellows.html',
            controller: 'FellowCtrl',
            data: {
                access: 'private'
            }
        })
        .state('edit/mentor', {
            url: '/mentors/:uid/edit',
            templateUrl: 'pages/edit-mentor.html',
            controller: 'MentorCtrl',
            data: {
                access: 'private'
            }
        })
        .state('mentor', {
            url: '/mentors/:uid',
            templateUrl: 'pages/mentor.html',
            controller: 'MentorCtrl',
            data: {
                access: 'private'
            }
        })
        .state('mentor/fellows', {
            url: '/mentors/:uid/fellows',
            templateUrl: '',
            controller: 'MentorCtrl',
            data: {
                access: 'private'
            }
        })
        .state('mentors', {
            url: '/mentors',
            templateUrl: 'pages/mentors.html',
            controller: 'MentorCtrl',
            data: {
                access: 'private'
            }
        })
        .state('smarterer',{
          url: '/smarterer/code/:code',
          templateUrl: 'pages/smarterer.html',
          controller: 'FellowCtrl',
          data: {
            access: 'private'
          }   
        })
        .state('admin-view', {
            url: '/admin',
            templateUrl: 'pages/admin.html',
            controller: 'MentorCtrl',
            data: {
                access: 'private'
            }
        });
    $urlRouterProvider.otherwise("/");
}]);
