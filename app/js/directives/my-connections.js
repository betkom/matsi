angular.module("matsi.directives")
    .directive('myConnections', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/pages/my-connections.html',
            controller: ['$rootScope','$scope', 'Mentor', 'Fellow', 'User',function($rootScope, $scope,  Mentor, Fellow, User) {
                if($scope.fellow) {
                    $scope.user = User.find($scope.user_id);
                    $scope.url = '/mentors/'+ $scope.user_id;
                 }
                else {
                    $scope.user = User.find($scope.user_id);
                    $scope.url = '/fellows/'+ $scope.user_id;
                }
            }]
        };
    });
