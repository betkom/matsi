module.exports = function(Refs, $rootScope, $firebase) {
    return {
        all: function(cb) {
            var mentors;
            if (!cb) {
                mentors = $firebase(Refs.users.orderByChild('disabled').equalTo(false)).$asArray();
            }
            else {
                mentors = Refs.users.orderByChild('role').equalTo('-mentor-').once('value', cb);
            }
            return mentors;
        },
        delete: function(mentor) {
            Refs.users.child(mentor.$id).update({
                removed: true
            });
            Refs.users.child(mentor.$id).remove();
        },
        disabled: function(cb) {
            var mentors;
            if (!cb) {
                mentors = $firebase(Refs.users.orderByChild('disabled').equalTo(true)).$asArray();
            }
            else {
                mentors = Refs.users.orderByChild('disabled').equalTo(true).once('value', cb);
            }
            return mentors;
        },
        enable: function(mentor, cb) {
            mentor = angular.copy(mentor);
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
            mentor = angular.copy(mentor);
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
