angular.module("matsi.directives")
    .directive('notification', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '/shared/notification.html',
            controller: ['$rootScope','$scope', 'Mentor', 'Fellow', function($rootScope, $scope,  Mentor, Fellow) {
                    $scope.mentor = Mentor.findOne($scope.user_id);
            }]
        };
    });