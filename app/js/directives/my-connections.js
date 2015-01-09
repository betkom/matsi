angular.module("matsi.directives")
    .directive('myConnections', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/pages/my-connections.html',
            controller: ['$rootScope','$scope', 'Mentor', 'Fellow', function($rootScope, $scope,  Mentor, Fellow) {
                if($scope.fellow) {
                    $scope.user = Mentor.findOne($scope.user_id);
                    $scope.url = '/mentors/'+ $scope.user_id;
                 }
                else {
                    $scope.user = Fellow.findOne($scope.user_id);
                    $scope.url = '/fellows/'+ $scope.user_id;
                }
            }]
        };
    });
