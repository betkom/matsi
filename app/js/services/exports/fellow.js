module.exports = function(rootRef, $rootScope, $firebase) {
    return {
        update: function(fellow, cb) {
            if (!$rootScope.currentUser || ($rootScope.currentUser && $rootScope.currentUser.uid != fellow.uid && !$rootScope.currentUser.isAdmin))
                return;
            fellow = angular.copy(fellow);
            delete fellow.$$conf;
            delete fellow.$priority;
            delete fellow.$id;
            // cb = cb || function(){};
            rootRef.child('users').child(fellow.uid).update(fellow, function(err) {
                if (cb)
                    cb(err);
            });
        },
        all: function(cb) {
            if (!cb)
                return $firebase(rootRef.child('users').orderByChild('role').equalTo('-fellow-')).$asArray();
            else
                return rootRef.child('users').orderByChild('role').equalTo('-fellow-').once('value', cb);
        },
        findOne: function(uid, cb) {
            if (!cb)
                return $firebase(rootRef.child('users').child(uid)).$asObject();
            else
                return rootRef.child('users').child(uid).once('value', cb);
        },
        mentorConstraint: function(uid, cb) {
            rootRef.child('users').child(uid).once('value', function(snap) {
                if (snap.val() && snap.val().isMentored === true) {
                    rootRef.child('users').orderByChild('isMentored').equalTo(false).once('value',cb);
                } else
                    cb(null);
            });
        },
        request: function(fellow, cb) {
            cb = cb || function() {};
            rootRef.child('users').child($rootScope.currentUser.uid).child('sentRequests').child(fellow.uid).push({
                timestamp: Firebase.ServerValue.TIMESTAMP,
            }, function(err) {
                if (!err) {
                    rootRef.child('users').child(fellow.uid).child('requests').child($rootScope.currentUser.uid).set({
                        timestamp: Firebase.ServerValue.TIMESTAMP,
                        picture: $rootScope.currentUser.picture,
                        firstName: $rootScope.currentUser.firstName
                    }, cb);
                }
            });
        },
        accept: function(mentor, cb) {
            cb = cb || function() {};
            rootRef.child('users').child($rootScope.currentUser.uid).child('mentors').child(mentor.uid).set({
                timestamp: Firebase.ServerValue.TIMESTAMP,
                picture: mentor.picture,
                fullName: mentor.fullName,
                email: mentor.email,
                uid: mentor.uid
            }, function(err) {
                if (!err) {
                    rootRef.child('users').child($rootScope.currentUser.uid).update({
                        isMentored: true
                    });
                    rootRef.child('users').child(mentor.uid).child('fellows').child($rootScope.currentUser.uid).set({
                        timestamp: Firebase.ServerValue.TIMESTAMP,
                        picture: $rootScope.currentUser.picture,
                        fullName: $rootScope.currentUser.fullName,
                        email: $rootScope.currentUser.email,
                        uid: $rootScope.currentUser.uid
                    }, cb);
                    rootRef.child('users').child($rootScope.currentUser.uid).child('requests').child(mentor.uid).remove();
                    rootRef.child('users').child(mentor.uid).child('sentRequests').child($rootScope.currentUser.uid).remove();
                }
            });
        },
        reject: function(mentor, cb) {
            cb = cb || function() {};
            rootRef.child('users').child(mentor.uid).child('sentRequests').child($rootScope.currentUser.uid).update({
                message: mentor.message
            }, function(err) {
                if (!err)
                    rootRef.child('users').child($rootScope.currentUser.uid).child('requests').child(mentor.uid).remove(cb);
            });
        }
    };
};
