Matsi.factory('MentorService', ['$firebase', '$cookies', '$stateParams', function($firebase, $cookies, $stateParams) {
        var rootRef = new Firebase($cookies.rootRef);
        return {
            readMentor: function(callback) {
                console.log($stateParams);
                var mentors = $firebase(rootRef.child('users').orderByChild('role').equalTo('-mentor-')).$asArray();
                if (callback && typeof callback === typeof
                    function() {})
                    mentors.$loaded().then(callback);
                return mentors;
            },
            readMyProfile: function(currentUID) {
                return $firebase(rootRef.child('users').child(currentUID)).$asObject();
            },
            readSingleMentor: function(uid, cb) {
                if (uid) {
                    console.log(uid, 'readSingleMentor');
                    var mentor = $firebase(rootRef.child('users').child(uid)).$asObject()
                    if (cb) {
                        mentor.$loaded().then(function(value) {
                            cb(value);
                        });
                    }
                    return mentor;
                }
            },
            updateMentor: function(mentorData, currentUId, cb) {
               mentorData1 = angular.copy(mentorData)
               delete mentorData1.$$conf;
               delete mentorData1.$id;
               delete mentorData1.$priority;
               delete mentorData1._proto_;
               rootRef.child('users').child(currentUId).update(mentorData1, function(err){
                 if(err){
                   cb(err);
                 }else{
                   cb();
                 }
               });
           }
       };
    }])
    .factory('MailService', ['$http', function($http) {
        return {
            send: function(type, params) {
                var paramsFellow = angular.copy(params);
                delete paramsFellow.$id;
                delete paramsFellow.$priority;
                $http.post('/mail/user/' + type, paramsFellow);
            }
        };
    }]);
