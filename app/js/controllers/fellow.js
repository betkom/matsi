'use strict';


angular.module('matsi.controllers')
    .controller('FellowCtrl', ['$rootScope', '$scope', '$cookies', '$sce', 'Fellow', '$http', '$stateParams', 'Mentor', 'MailService', '$mdDialog', '$mdToast', '$location', 'Utils', '$timeout', 'Log', '$state', 'Levels', 'User', '$uibModal', 'Upload',
        function($rootScope, $scope, $cookies, $sce, Fellow, $http, $stateParams, Mentor, MailService, $mdDialog, $mdToast, $location, Utils, $timeout, Log, $state, Levels, User, $uibModal, Upload) {
            //get code and redirect if current url is smarterer callback url
            $scope.fileUploaded = false;
            $scope.fileLoading = false;

            $scope.init = function() {
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
                        var pic = 'fa fa-upload fa-fw';
                        Log.save(info, pic);
                        $location.path('fellows/' + $rootScope.currentUser.uid);
                    });
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
                    var pic = 'fa fa-upload fa-fw';
                    Log.save(info, pic);

                });
            };

            //Smarterer & plum Checkbox
            $scope.smartererCheck = false;
            $scope.plumCheck = false;
            $scope.toggleCheck = function(val) {
                if (val === 'smarterer'){
                    $scope.smartererCheck = !$scope.smartererCheck;
                } else {
                    $scope.plumCheck = !$scope.plumCheck;
                }
            };


            //Developer rank
            $scope.levels = Levels.all().$loaded(function(val) {
                $scope.levels = val;
            });

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
                        $scope.fellowsFilter();
                    }
                } else {
                    if (currentPage < lastPage() - 1) {
                        currentPage++;
                        $scope.fellowsFilter();
                    }
                }
            };
            $scope.navigate = function(page) {
                currentPage = page;
                $scope.currentPage = currentPage;
                $scope.fellowsFilter();
            };

            var lastPage = function() {
                return Math.ceil(fellowsOnpage.length / numPerPage);
            };

            $scope.fellowsFilter = function() {
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
                        $scope.fellowsFilter();
                        if (cb)
                            cb();
                    });
                }
            };

            $scope.find = function() {
                var uid = $rootScope.currentUser ? ($stateParams.uid || $rootScope.currentUser.uid) : $stateParams.uid;
                if (uid) {
                    var fellow = User.find(uid);
                    if (fellow) {
                        fellow.$loaded(function(data) {
                            $scope.fellow = data;
                            $scope.uploadedResult = $scope.fellow.videoUrl;
                            if(data.level){
                            $scope.level = Levels.find(data.level);
                          }
                        });
                    }
                }
                this.showMessageBox = true;
            };

            $scope.confirmation = function(size) {
              $scope.modalInstance = $uibModal.open({
                  templateUrl: '/pages/delete-confirmation.html',
                  controller: 'FellowCtrl',
                  size: size,
                  scope: $scope
                });
            };

            $scope.ok = function() {
              $scope.modalInstance.close();
            };

            $scope.delete = function(fellowId) {
              Fellow.delete(fellowId, function() {
                $scope.modalInstance.close();
              });
              $location.path('/fellows');
            };

            $scope.update = function() {
                if ($rootScope.currentUser.uid === $scope.fellow.uid || $rootScope.currentUser.isAdmin) {
                    if ($scope.uploadedResult) {
                        $scope.fellow.videoUrl = $scope.uploadedResult;
                        var info2 = $scope.fellow.fullName + ' uploaded a video';
                        var pic = 'fa fa-film fa-fw';
                        if ($scope.fellow.fullName) {
                            Log.save(info2, pic);
                        }
                    }
                    Fellow.update($scope.fellow, function(err) {
                        if (err) {
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
                        if ($scope.smartererCheck) {
                            // request smarterer authorization
                            window.location.href = 'https://smarterer.com/oauth/authorize?client_id=b30a2803ffe34bc68a6fe7757b039468&callback_url=http%3A%2F%2Fmatsi.herokuapp.com%2Ffellows%2F';
                        }else{
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
                            Utils.showAlert(ev, 'This fellow is already being mentored, please select a fellow that is not currently being mentored');
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
                var info = $scope.fellow.fullName + ' received a mentor request ';
                var pic = 'fa fa-tag fa-fw';
                if ($scope.fellow.fullName) {
                    Log.save(info, pic);
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
            $scope.upload = function($file) {
                console.log('got called')
                $scope.fileUploaded = true;
                $scope.file = $file;
                console.log('in here')
                if ($scope.file.size < 7000000 && ($scope.file.type === 'video/mp4' || $scope.file.type === 'video/mkv' || $scope.file.type === 'video/wmv')) {
                    $scope.videoFiles = [];
                    $scope.correctFormat = true;
                    $scope.changeSize = false;
                    if ($scope.file) {
                        $scope.start();
                    }
                } else {
                    $scope.changeSize = true;
                }
            };
            $scope.start = function() {
                $scope.fileLoading = true;
                var query = {
                    filename: $scope.file.name,
                    type: $scope.file.type
                };
                $http.post('/signing', query)
                .then(function(result) {
                    console.log(result, 'what is result')
                    var fields = result.data.fields
                    delete result.data.fields['success_action_status']
                    var formData = {
                        key: fields.key,
                        AWSAccessKeyID: fields.AWSAccessKeyId,
                        acl: fields.acl,
                        policy: fields.policy,
                        signature: fields.signature,
                        filename: $scope.file.name,
                        'Content-Type': $scope.file.type
                    }
                    console.log(Upload, 'what')
                    $scope.videoFiles[0] = Upload.upload({
                        headers: {
                        'Content-Type': $scope.file.type
                        },
                        url: result.data.url, //s3Url
                        method: 'POST',
                        data: formData,
                        file: $scope.file
                    })
                    $scope.videoFiles[0].then(function(response) {
                        // file is uploaded successfully
                        console.log(response, 'response')
                        // console.log(config, 'config')
                        // console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
                    }, function(response) {
                        console.log(response, 'response')
                        if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
                        alert('Connection Timed out');
                    }, function(evt) {
                        console.log('what happend')
                    })
                })
                .catch(function(data, status, headers, config) {
                    console.log(data, 'data error')
                    console.log(status, 'status')
                    console.log(headers, 'headers')
                    // called    asynchronously if an error occurs
                    // or server returns response with an error status.
                });

            };
        }
    ]);
