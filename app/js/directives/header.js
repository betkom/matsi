angular.module("matsi.directives")
    .directive('header', function() {
        return {
            restrict: 'E',
            controller: ['$rootScope', '$scope', '$firebase', '$cookies', 'Fellow', '$timeout', '$stateParams', '$location', 'MailService', 'Auth',
                function($rootScope, $scope, $firebase, $cookies, Fellow, $timeout, $stateParams, $location, MailService, Auth) {
                    var rootRef = new Firebase($cookies.rootRef);
                    // Start with no user logged in
                    $scope.login = function(){
                        console.log('login from directive');
                        Auth.login();
                    };
                    $scope.profile = function(val) {
                        if ($rootScope.currentUser.role === '-fellow-') {
                            $location.path('fellows/' + $rootScope.currentUser.uid);
                        } else {
                            $location.path('mentors/' + $rootScope.currentUser.uid);
                        }
                    };
                    $scope.editProfile = function(val) {
                        if ($rootScope.currentUser.role === '-fellow-') {
                            $location.path('fellows/' + $rootScope.currentUser.uid + '/edit');
                        } else {
                            $location.path('mentors/' + $rootScope.currentUser.uid + '/edit');
                        }
                    };
                }
            ]
        };
    });


