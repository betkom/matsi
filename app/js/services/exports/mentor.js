module.exports = function(rootRef, $rootScope, $firebase) {
    return {
        all: function(cb) {
            var mentors;
            if (!cb)
                mentors = $firebase(rootRef.child('users').orderByChild('disabled').equalTo(false)).$asArray();
            else
                mentors = rootRef.child('users').orderByChild('role').equalTo('-mentor-').once('value', cb);
            return mentors;
        },
        delete: function(mentorId) {
            rootRef.child('users').child(mentorId).update({
                removed: true
            });
            rootRef.child('users').child(mentorId).remove();
        },
        disabled: function(cb) {
            var mentors;
            if (!cb)
                mentors = $firebase(rootRef.child('users').orderByChild('disabled').equalTo(true)).$asArray();
            else
                mentors = rootRef.child('users').orderByChild('disabled').equalTo(true).once('value', cb);
            return mentors;
        },
        enable: function(mentor, cb) {
            mentor = angular.copy(mentor);
            delete mentor.$$conf;
            delete mentor.$id;
            delete mentor.$priority;
            delete mentor._proto_;
            mentor.disabled = false;
            rootRef.child('users').child(mentor.uid).update(mentor, function(err) {
                if (cb)
                    cb(err);
            });
        },
        findOne: function(uid, cb) {
            if (cb)
                return rootRef.child('users').child(uid).once('value', cb);
            else
                return $firebase(rootRef.child('users').child(uid)).$asObject();
        },
        update: function(mentor, cb) {
            if (!$rootScope.currentUser || ($rootScope.currentUser && $rootScope.currentUser.uid != mentor.uid && !$rootScope.currentUser.isAdmin))
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
