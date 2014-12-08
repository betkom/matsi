module.exports = function(rootRef,$firebase) {
    return {
        all: function(callback) {
            console.log($stateParams);
            var mentors = $firebase(rootRef.child('users').orderByChild('role').equalTo('-mentor-')).$asArray();
            if (callback && typeof callback === typeof
                function() {})
                mentors.$loaded().then(callback);
            return mentors;
        },
        findOne: function(uid, cb) {
            if (cb)
                return rootRef.child('users').child(uid).once('value', cb);
            else
                return $firebase(rootRef.child('users').child(uid)).$asObject();
        },

        update: function(mentor, cb) {
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
