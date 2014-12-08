module.exports = function(rootRef, $rootScope, $firebase) {
    return {
        all: function(cb) {
            var mentors;
            if(!cb)
            	mentors = $firebase(rootRef.child('users').orderByChild('role').equalTo('-mentor-')).$asArray();
         	else
                mentors = rootRef.child('users').orderByChild('role').equalTo('-mentor-').once('value',cb);
            return mentors;
        },
        findOne: function(uid, cb) {
            if (cb)
                return rootRef.child('users').child(uid).once('value', cb);
            else
                return $firebase(rootRef.child('users').child(uid)).$asObject();
        },

        update: function(mentor, cb) {
    		if(!$rootScope.currentUser || ($rootScope.currentUser && $rootScope.currentUser.uid != mentor.uid && !$rootScope.currentUser.isAdmin))
      			return;
            mentor = angular.copy(mentor);
            delete mentor.$$conf;
            delete mentor.$id;
            delete mentor.$priority;
            delete mentor._proto_;
            rootRef.child('users').child(mentor.uid).update(mentor, function(err) {
                if (cb)
                    cb(err);
            });
        }
    };
};
