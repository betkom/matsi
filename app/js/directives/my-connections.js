angular.module("matsi.directives")
    .directive('myConnections', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '/pages/my-connections.html',
            controller: ['$rootScope','$scope', 'Mentor', 'Fellow', function($rootScope, $scope,  Mentor, Fellow) {

                // console.log($scope.info,'info');
                // console.log($scope.user);
                // $scope.$watch('user',function(newValue) {
                //     console.log(newValue);
                // });
                if($scope.fellow) {
                    $scope.user = Mentor.findOne($scope.user_id);
                    $scope.url = '/mentors/'+ $scope.user_id;
                //     $scope.user = $scope.mentor.fellows;
                //     console.log($scope.user, 'from mentor');
                 }
                else {
                    $scope.user = Fellow.findOne($scope.user_id);
                    $scope.url = '/fellows/'+ $scope.user_id;
                    
                    //$scope.user = $scope.fellow.mentors;
                    //console.log($scope.fellow.mentors, 'from fellow');
                }
            }]
        };
    });