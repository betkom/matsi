angular.module("matsi.directives")
    .directive('notification', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '/shared/notification.html',
            controller: ['$rootScope','$scope', 'Mentor', 'Fellow', function($rootScope, $scope,  Mentor, Fellow) {
                    $scope.fellow = Mentor.findOne($rootScope.currentUser.uid);
            }]
        };
    });