module.exports = function(rootRef, $rootScope, $firebase, $http) {
  return {
    update: function(fellow, cb) {
      if (!$rootScope.currentUser || ($rootScope.currentUser && $rootScope.currentUser.uid != fellow.uid && !$rootScope.currentUser.isAdmin)) {
        return;
      } else {
        fellow = angular.copy(fellow);
        delete fellow.$$conf;
        delete fellow.$priority;
        delete fellow.$id;
        cb = cb || function() {};
        rootRef.child('users').child(fellow.uid).update(fellow, cb);
      }
    },
    delete: function(fellowId) {
      rootRef.child('users').child(fellowId).update({
        removed: true
      });
      rootRef.child('users').child(fellowId).remove();
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
          rootRef.child('users').orderByChild('isMentored').equalTo(false).once('value', cb);
        } else
          cb(null);
      });
    },
    request: function(fellow, cb) {
      cb = cb || function() {};
      rootRef.child('users').child($rootScope.currentUser.uid).child('sentRequests').child(fellow.uid).set({
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
        timestamp: Firebase.ServerValue.TIMESTAMP
      }, function(err) {
        if (!err) {
          rootRef.child('users').child($rootScope.currentUser.uid).update({
            isMentored: true
          });
          rootRef.child('users').child(mentor.uid).child('fellows').child($rootScope.currentUser.uid).set({
            timestamp: Firebase.ServerValue.TIMESTAMP
          }, cb);
          rootRef.child('users').child(mentor.uid).child('history').push({
            fellow: $rootScope.currentUser.uid,
            timestamp: Firebase.ServerValue.TIMESTAMP
          });
          rootRef.child('users').child($rootScope.currentUser.uid).child('requests').child(mentor.uid).remove();
          rootRef.child('users').child(mentor.uid).child('sentRequests').child($rootScope.currentUser.uid).remove();
        }
      });
    },
    reject: function(mentor) {
      rootRef.child('users').child(mentor.uid).child('sentRequests').child($rootScope.currentUser.uid).remove();
      rootRef.child('users').child($rootScope.currentUser.uid).child('requests').child(mentor.uid).remove();
    },
    backEndPost: function(url, params, cb) {
      $http.post(url, params).success(function(res) {
        if (cb) {
          cb(res);
        }
      }).error(function(err) {
        cb(err);
      });

    }
  };
};
