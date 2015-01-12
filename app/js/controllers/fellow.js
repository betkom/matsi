angular.module('matsi.controllers')
    .controller("FellowCtrl", ['$rootScope', '$scope', '$cookies', '$upload', '$sce', 'Fellow', '$http', '$stateParams', 'Mentor', 'MailService', '$mdDialog', '$mdToast', '$location', 'utils', '$timeout', 'Log',
        function($rootScope, $scope, $cookies, $upload, $sce, Fellow, $http, $stateParams, Mentor, MailService, $mdDialog, $mdToast, $location, utils, $timeout, Log) {
            //get code and redirect if current url is smarterer callback url
            $scope.fileUploaded = false;
            $scope.fileLoading = false;
            if ($location.absUrl().toString().indexOf('fellows/?code=') > -1) {
                var code = $location.search().code;
                var param = {
                    code: code
                };
                var url = '/smarterer/code/';
                Fellow.backEndPost(url, param, function(res) {
                    var data = {
                        uid: $rootScope.currentUser.uid,
                        badges: res.badges
                    };
                    Fellow.update(data);
                    var info = $rootScope.currentUser.fullName + ' updated Smarterer badges ';
                    Log.save(info);
                });
            }
            //Smarterer & plum Checkbox
            $scope.check = false;
            $scope.plumCheck = false;
            $scope.toggleCheck = function(val) {
                if (val === "smarterer") {
                    $scope.check = !$scope.check;
                } else {
                    $scope.plumCheck = !$scope.plumCheck;
                }
            };
            // plum api integrations
            $scope.plum = function() {
                var param = {
                    email: $scope.fellow.plumEmail,
                    fname: $scope.fellow.firstName,
                    lname: $scope.fellow.lastName
                };
                var url = '/plum/api/';
                Fellow.backEndPost(url, param, function(res) {
                    var data = {
                        uid: $scope.fellow.uid,
                        plumBadges: res.candidates[0].badges
                    };
                    Fellow.update(data);
                    var info = $scope.fellow.fullName + ' updated plum Badges ';
                    Log.save(info);
                });
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
            $scope.opened = false;
            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.opened = !$scope.opened;
            };
            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };
            $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[1];
            $scope.currentPage = 0;

            var start = 0,
                end = 0,
                currentPage = 0,
                numPerPage = 16,
                fellowsOnpage = [],
                lastIndexOfFellows = 0;
            $scope.pageCount = [];

            $scope.shuffle = function(next) {
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
            $scope.navigate = function(page) {
                currentPage = page;
                $scope.currentPage = currentPage;
                fellowsFilter();
            };

            var lastPage = function() {
                return Math.ceil(fellowsOnpage.length / numPerPage);
            };

            var fellowsFilter = function() {
                start = numPerPage * currentPage;
                end = numPerPage + start;
                $scope.fellows = fellowsOnpage.slice(start, end);
            };

            $scope.all = function(cb) {
                start = 0;
                end = numPerPage;
                var fellows = Fellow.all();
                if (fellows) {
                    fellows.$loaded(function(data) {
                        fellowsOnpage = data;
                        $scope.pageCount = new Array(lastPage());
                        lastIndexOfFellows = fellowsOnpage.length - 1;
                        fellowsFilter();
                        if (cb)
                            cb();
                    });
                }
            };

            $scope.findOne = function() {
                var uid = $rootScope.currentUser ? ($stateParams.uid || $rootScope.currentUser.uid) : $stateParams.uid;
                var fellow = Fellow.findOne(uid);
                if (fellow) {
                    fellow.$loaded(function(data) {
                        $scope.fellow = data;
                        $scope.uploadedResult = $scope.fellow.videoUrl;
                    });
                }
                this.showMessageBox = true;
            };

            $scope.delete = function(fellowId) {
                Fellow.delete(fellowId);
                //window.location.reload();
            };

            $scope.update = function() {
                if ($rootScope.currentUser.uid === $scope.fellow.uid || $rootScope.currentUser.isAdmin) {
                    if ($scope.uploadedResult) {
                        $scope.fellow.videoUrl = $scope.uploadedResult;
                        var info2 = $scope.fellow.fullName + 'has uploaded a video';
                        if ($scope.fellow.fullName) {
                            Log.save(info2);
                        }
                    }
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
                        if ($scope.plumCheck) {
                            $scope.plum();
                        }
                        if ($scope.check) {
                            // request smarterer authorization
                            window.location.href = 'https://smarterer.com/oauth/authorize?client_id=b30a2803ffe34bc68a6fe7757b039468&callback_url=http%3A%2F%2Fmatsi.herokuapp.com%2Ffellows%2F';

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
                var info = $scope.fellow.fullName + " received a mentor request ";
                if ($scope.fellow.fullName) {
                    Log.save(info);
                }
            };
            $scope.allLogs = function(date) {
                if (date) {
                    $scope.date = moment(date).format('YYYY-MM-DD');
                    $scope.logs = Log.allLogs($scope.date);
                    $location.path('/logs');
                } else {
                    $scope.date = moment().format('YYYY-MM-DD');
                }
                $scope.logs = Log.allLogs($scope.date);
            };
            $scope.showFellows = false;
            $scope.showFellows1 = false;
            $scope.showLog = false;

            $scope.allMentored = function() {
                $scope.showFellows = true;
                $scope.showFellows1 = false;
                $scope.showLog = true;
                $scope.fellows = Log.allMentored();
            };
            $scope.allUnMentored = function() {
                $scope.showFellows1 = true;
                $scope.showFellows = false;
                $scope.showLog = true;
                $scope.fellows1 = Log.allUnMentored();
            };
            $scope.scePermit = function(path) {      
                return $sce.trustAsResourceUrl(path);    
            };
            $scope.onFileSelect = function($files, $index) {
                $scope.fileUploaded = true;
                $scope.files = $files;
                 if($scope.files[0].size < 7000000 && ($scope.files[0].type === 'video/mp4' || $scope.files[0].type ==='video/mkv' || $scope.files[0].type === 'video/wmv')){
                    $scope.videoFiles = [];
                    $scope.correctFormat = true;
                    $scope.changeSize = false;
                    if ($scope.files) {
                        $scope.start(0, $index);
                    }
                }else{
                  $scope.changeSize = true;
                }
            };
            $scope.start = function(indexOftheFile, $index) {
                $scope.fileLoading = true;
                var formData = {
                    key: $scope.files[indexOftheFile].name,
                    AWSAccessKeyID: 'AKIAIWGDKQ33PXY36LQA',
                    acl: 'private',
                    policy: 'ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogImtlaGVzamF5In0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRrZXkiLCAiIl0sCiAgICB7ImFjbCI6ICJwcml2YXRlIn0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRDb250ZW50LVR5cGUiLCAiIl0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRmaWxlbmFtZSIsICIiXSwKICAgIFsiY29udGVudC1sZW5ndGgtcmFuZ2UiLCAwLCA1MjQyODgwMDBdCiAgXQp9',
                    signature: 'PLzajm+JQ9bf/rv9lZJzChPwiBc=',
                    filename: $scope.files[indexOftheFile].name,
                    'Content-Type': $scope.files[indexOftheFile].type
                };
                $scope.videoFiles[indexOftheFile] = $upload.upload({
                    url: 'https://kehesjay.s3-us-west-2.amazonaws.com/',
                    method: 'POST',
                    headers: {
                        'Content-Type': $scope.files[indexOftheFile].type
                    },
                    data: formData,
                    file: $scope.files[indexOftheFile]
                });
                $scope.videoFiles[indexOftheFile].then(function(response) {
                    $timeout(function() {
                        var videoUrl = 'https://kehesjay.s3-us-west-2.amazonaws.com/' + $scope.files[indexOftheFile].name;
                        $scope.uploadedResult = videoUrl;
                        $scope.fileUploaded = false;
                        $scope.fileLoading = false;
                    }, 6000);
                }, function(response) {
                    if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
                    alert('Connection Timed out');
                }, function(evt) {
                });
            };
        }
    ]);
