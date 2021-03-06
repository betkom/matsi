angular.module("matsi.services")
    .factory('MailService', ['$http', function($http) {
        return {
            send: function(type, params) {
                var paramsFellow = angular.copy(params);
                delete paramsFellow.$id;
                delete paramsFellow.$priority;
                $http.post('/mail/user/' + type, paramsFellow);
            }
        };
    }]);
