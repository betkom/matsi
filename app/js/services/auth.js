angular.module("matsi.services")
  .factory('Auth', ['$firebase', '$rootScope', 'Refs', '$state', '$timeout', 'MailService', function($firebase, $rootScope, Refs, $state, $timeout, MailService) {
    return require('./exports/auth')(Refs,$firebase,$rootScope,$state, $timeout, MailService);
  }]);