module.exports = function(Refs, $rootScope, $firebase, $http) {
  return {
    
    update: function(fellow, cb) {
      if (!fellow || (fellow && $rootScope.currentUser.uid != fellow.uid && !$rootScope.currentUser.isAdmin)) {
        return;
      } 
      else {
        fellow = angular.copy(fellow);
        delete fellow.$$conf;
        delete fellow.$priority;
        delete fellow.$id;
        cb = cb || function() {};
        Refs.users.child(fellow.uid).update(fellow, cb);
      }
    },

    delete: function(fellowId) {
      Refs.users.child(fellowId).update({ removed: true });
      Refs.users.child(fellowId).remove();
    },

    all: function(cb) {
      var ref = Refs.users.orderByChild('role').equalTo('-fellow-');
      if (!cb) {
        return $firebase(ref).$asArray();
      }
      else {
        return ref.once('value', cb);
      }
    },

    mentorConstraint: function(uid, cb) {
      Refs.users.child(uid).once('value', function(snap) {
        if (snap.val() && snap.val().isMentored === true) {
          Refs.users.orderByChild('isMentored').equalTo(false).once('value', cb);
        } else
          cb(null);
      });
    },

    request: function(fellow, cb) {
      cb = cb || function() {};
      Refs.users.child($rootScope.currentUser.uid).child('sentRequests').child(fellow.uid).set({
        timestamp: Firebase.ServerValue.TIMESTAMP,
      }, function(err) {
        if (!err) {
          Refs.users.child(fellow.uid).child('requests').child($rootScope.currentUser.uid).set({
            timestamp: Firebase.ServerValue.TIMESTAMP,
            picture: $rootScope.currentUser.picture,
            firstName: $rootScope.currentUser.firstName
          }, cb);
        }
      });
    },

    accept: function(mentor, cb) {
      cb = cb || function() {};
      var mentorRef =  Refs.users.child(mentor.uid);
      var ref =  Refs.users.child($rootScope.currentUser.uid);
      ref.child('mentors').child(mentor.uid).set({
        timestamp: Firebase.ServerValue.TIMESTAMP
      }, function(err) {
        if (!err) {
          ref.update({
            isMentored: true
          });
          mentorRef.child('fellows').child($rootScope.currentUser.uid).set({
            timestamp: Firebase.ServerValue.TIMESTAMP
          }, cb);
          mentorRef.child('history').push({
            fellow: $rootScope.currentUser.uid,
            timestamp: Firebase.ServerValue.TIMESTAMP
          });
          ref.child('requests').child(mentor.uid).remove();
          mentorRef.child('sentRequests').child($rootScope.currentUser.uid).remove();
        }
      });
    },

    reject: function(mentor) {
      Refs.users.child(mentor.uid).child('sentRequests').child($rootScope.currentUser.uid).remove();
      Refs.users.child($rootScope.currentUser.uid).child('requests').child(mentor.uid).remove();
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
