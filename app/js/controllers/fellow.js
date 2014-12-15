angular.module("matsi.controllers")
    .controller("FellowCtrl", ['$rootScope', '$scope', '$cookies', 'Fellow', '$http', '$stateParams', 'Mentor', 'MailService', '$mdDialog', '$mdToast', '$location', 'utils', '$timeout',
        function($rootScope, $scope, $cookies, Fellow, $http, $stateParams, Mentor, MailService, $mdDialog, $mdToast, $location, utils, $timeout) {
            $scope.smarterer = function() {
                var code = $stateParams.code;
                $scope.code = code;
            };
            if (window.location.toString().indexOf('fellows/?code=') > -1) {
                var code = window.location.search;
                code = code.substring(1, code.length);
                var param = {
                    code: code
                };
                
                $http.post('/smarterer/code/', param).success(function(res) {
                    $scope.fellow.badges = res.badges;
                    Fellow.update($scope.fellow);
                });
            };
            //Smarterer Checkbox
            $scope.check = false;
            $scope.toggleCheck = function() {
                $scope.check = !$scope.check;
                console.log($scope.check);
            };
            //Date picker
            $scope.today = function() {
                $scope.dt = new Date();
                var curr_date = $scope.dt.getDate();
                var curr_month = $scope.dt.getMonth();
                var curr_year = $scope.dt.getFullYear();
                $scope.dt = curr_year + curr_month + curr_date;
            };
            $scope.today();
            $scope.clear = function() {
                $scope.dt = null;
            };
            $scope.toggleMin = function() {
                $scope.minDate = $scope.minDate ? null : new Date();
            };
            $scope.toggleMin();
            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.opened = true;
                setTimeout(function() {
                    $scope.opened = false;
                }, 10);
            };
            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };
            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[2];


            $scope.all = function() {
                $scope.fellows = Fellow.all();
            };

            $scope.findOne = function() {
                var uid = $rootScope.currentUser ? ($stateParams.uid || $rootScope.currentUser.uid) : $stateParams.uid;
                $scope.fellow = Fellow.findOne(uid);
                this.showMessageBox = true;
            };
            $scope.delete = function(fellowId) {
                Fellow.delete(fellowId);
            };
            $scope.update = function() {
                if ($rootScope.currentUser.uid === $scope.fellow.uid || $rootScope.currentUser.isAdmin) {
                    Fellow.update($scope.fellow, function(err) {
                        if (err !== null) {
                            $mdDialog.show(
                                $mdDialog.alert()
                                .title('Update error')
                                .content('An error occured,  try again later')
                                .ariaLabel('Password notification')
                                .ok('Okay!')

                            );
                        }
                        if ($scope.check) {
                            window.location.assign('https://smarterer.com/oauth/authorize?client_id=b30a2803ffe34bc68a6fe7757b039468&callback_url=http%3A%2F%2Flocalhost%3A5555%2Ffellows%2F');
                        } else {
                            $location.path('fellows/' + $rootScope.currentUser.uid);
                        }
                    });
                }
            };
            $scope.showBox = function() {
                $scope.showMessageBox = false;
            };

            $scope.mentorConstraints = function(ev) {
                Fellow.mentorConstraint($stateParams.uid, function(res, hasUnmentored) {
                    if (res) {
                        if (hasUnmentored) {
                            $scope.sendRequest();
                        } else {
                            utils.showAlert(ev, 'This fellow is already being mentored, please select a fellow that is not currently being mentored');
                        }
                    } else {
                        $scope.sendRequest();
                    }
                });
            };

            $scope.sendRequest = function() {
                $scope.fellow.reason = $scope.fellow.message;
                MailService.send(1, $scope.fellow);
                Fellow.request($scope.fellow);
            };
        }
    ]);
