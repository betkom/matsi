Matsi.factory('FellowService', ['$firebase', '$cookies', '$stateParams', '$rootScope', function($firebase, $cookies, $stateParams, $rootScope) {
        var rootRef = new Firebase($cookies.rootRef);
        return {
            updateFellow: function(fellowData, currentUID) {
                console.log(currentUID);
                var fellowData1 = angular.copy(fellowData);
                console.log(fellowData1);
                delete fellowData1.$$conf;
                delete fellowData1.$priority;
                delete fellowData1.$id;
                delete fellowData1.__proto__;
                rootRef.child('users').child(currentUID).update(fellowData1);
            },
            readFellow: function() {
                return $firebase(rootRef.child('users').orderByChild('role').equalTo('-fellow-')).$asObject();
            },
            readMyProfile: function(currentUID) {
                return $firebase(rootRef.child('users').child(currentUID)).$asObject();
            },
            readSingleFellow: function(uid) {
                if (uid) {
                    return $firebase(rootRef.child('users').child(uid)).$asObject();
                }
            },
            mentorConstraint: function(cb) {
                var unMentoredFellows = [];
                var unMentoredList = [];
                var data = {};
                var result = $firebase(rootRef.child('users').child($stateParams.uid)).$asObject();
                var check = result.$loaded().then(function(response) {
                    data = response;
                    if (data.isMentored === true) {
                        $firebase(rootRef.child('users').orderByChild('isMentored').equalTo(false)).$asArray().$loaded().then(function(responseData) {
                            if (cb && typeof cb === typeof
                                    function() {}) {
                                cb(responseData);
                            };
                        });
                    } else {
                        if (cb) {
                            cb(null);
                        }
                    }
                });
                return check;
            },
            regRequest: function(fellow) {
                rootRef.child('users').child($rootScope.currentUser.uid).child('sentRequests').child(fellow.uid).push({
                    timestamp: Firebase.ServerValue.TIMESTAMP,
                });
                rootRef.child('users').child(fellow.uid).child('requests').child($rootScope.currentUser.uid).set({
                    timestamp: Firebase.ServerValue.TIMESTAMP,
                });
            },
            acceptRequest: function(mentor) {
                rootRef.child('users').child($rootScope.currentUser.uid).child('mentors').child(mentor.uid).set({
                    timestamp: Firebase.ServerValue.TIMESTAMP,
                    email: mentor.email
                });
                rootRef.child('users').child($rootScope.currentUser.uid).update({
                    isMentored: true
                });
                rootRef.child('users').child(mentor.uid).child('fellows').child($rootScope.currentUser.uid).set({
                    timestamp: Firebase.ServerValue.TIMESTAMP
                });
                rootRef.child('users').child($rootScope.currentUser.uid).child('requests').child(mentor.uid).remove();
                rootRef.child('users').child(mentor.uid).child('sentRequests').child($rootScope.currentUser.uid).remove();
            },
            rejectRequest: function(mentor) {
                rootRef.child('users').child(mentor.uid).child('sentRequests').child($rootScope.currentUser.uid).update({
                    message: mentor.message
                });
                rootRef.child('users').child($rootScope.currentUser.uid).child('requests').child(mentor.uid).remove();
            }
        };
    }]);
