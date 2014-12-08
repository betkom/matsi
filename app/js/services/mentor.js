angular.module("matsi.services")
    .factory('MentorService', ['$firebase', '$cookies', '$stateParams', function($firebase, $cookies, $stateParams) {
        var rootRef = new Firebase($cookies.rootRef);
        return {
            find: function(callback) {
                console.log($stateParams);
                var mentors = $firebase(rootRef.child('users').orderByChild('role').equalTo('-mentor-')).$asArray();
                if (callback && typeof callback === typeof
                    function() {})
                    mentors.$loaded().then(callback);
                return mentors;
            },
            profile: function(currentUID) {
                return $firebase(rootRef.child('users').child(currentUID)).$asObject();
            },
            findOne: function(uid, cb) {
                if (uid) {
                    console.log(uid, 'readSingleMentor');
                    var mentor = $firebase(rootRef.child('users').child(uid)).$asObject();
                    if (cb) {
                        mentor.$loaded().then(function(value) {
                            cb(value);
                        });
                    }
                    return mentor;
                }
            },
            update: function(mentorData, cb) {
               mentorData1 = angular.copy(mentorData);
               delete mentorData1.$$conf;
               delete mentorData1.$id;
               delete mentorData1.$priority;
               delete mentorData1._proto_;
               rootRef.child('users').child(mentorData.uid).update(mentorData1, function(err){
                 if(err){
                   cb(err);
                 }else{
                   cb();
                 }
               });
           }
       };
    }]);