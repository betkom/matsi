angular.module("matsi.controllers")
    .controller("FellowCtrl", ['$rootScope', '$scope', '$cookies', 'Fellow', '$http', '$stateParams', 'Mentor', 'MailService', '$mdDialog', '$mdToast', '$location', '$mdDialog', 'utils',
        function($rootScope, $scope, $cookies, Fellow, $http, $stateParams, Mentor, MailService, $mdDialog, $mdToast, $location, utils) {

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

            // Disable weekend selection
            $scope.disabled = function(date, mode) {
                return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
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
            $scope.currentPage = 0;

            var start = 0,
            end = 0,
            currentPage = 0,
            numPerPage = 16,
            fellows = [],
            lastIndexOfFellows = 0;
            $scope.pageCount = [];

            $scope.shuffle = function(next){
                if (!next) { 
                    if (currentPage > 0) {
                        currentPage--;
                        fellowsFilter();
                    }
                } else {
                        if (currentPage < lastPage() - 1) {
                    currentPage++;
                    fellowsFilter();
                    }
                }
            };
            $scope.navigate = function(page){
                currentPage = page;
                $scope.currentPage = currentPage;
                fellowsFilter();
            };

            var lastPage = function() {
                return Math.ceil(fellows.length / numPerPage);
            };

            var fellowsFilter = function(){
                start = numPerPage * currentPage;
                end = numPerPage + start;
                $scope.fellows = fellows.slice(start,end);
            };

            $scope.all = function() {
                start = 0;
                end = numPerPage;
                Fellow.all().$loaded(function(data) {
                    fellows = data;
                    $scope.pageCount = new Array(lastPage());
                    lastIndexOfFellows = fellows.length - 1;
                    fellowsFilter();
                });
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
                        $location.path('fellows/' + $rootScope.currentUser.uid);
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
