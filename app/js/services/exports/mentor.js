module.exports = function(Refs, $rootScope, $firebaseObject, $firebaseArray) {
    return {
        all: function(cb) {
            var mentors;
            if (!cb) {
                mentors = $firebaseArray(Refs.users.orderByChild('disabled').equalTo(false))
            }
            else {
                mentors = Refs.users.orderByChild('role').equalTo('-mentor-').once('value', cb);
            }
            return mentors;
        },
        delete: function(mentorId) {
            Refs.users.child(mentorId).update({
                removed: true
            });
            Refs.users.child(mentorId).remove();
        },
        disabled: function(cb) {
            var mentors;
            if (!cb) {
                mentors = $firebaseArray(Refs.users.orderByChild('disabled').equalTo(true))
            }
            else {
                mentors = Refs.users.orderByChild('disabled').equalTo(true).once('value', cb);
            }
            return mentors;
        },
        enable: function(mentor, cb) {
            // mentor = angular.copy(mentor);
            mentor = Object.assign(mentor);
            delete mentor.$$conf;
            delete mentor.$id;
            delete mentor.$priority;
            delete mentor._proto_;
            mentor.disabled = false;
            Refs.users.child(mentor.uid).update(mentor, function(err) {
                if (cb) {
                    cb(err);
                }
            });
        },
        
        update: function(mentor, cb) {
            if (!$rootScope.currentUser || ($rootScope.currentUser && $rootScope.currentUser.uid != mentor.uid && !$rootScope.currentUser.isAdmin)) {
                return;
            }
            mentor = Object.assign(mentor);
            // mentor = angular.copy(mentor);
            delete mentor.$$conf;
            delete mentor.$id;
            delete mentor.$priority;
            delete mentor._proto_;
            Refs.users.child(mentor.uid).update(mentor, function(err) {
                if (cb) {
                    cb(err);
                }
            });
        }
    };
};
