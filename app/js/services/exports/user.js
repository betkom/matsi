module.exports = function(Refs, $rootScope, $firebaseObject, $firebaseArray) {
  return {
		find: function(uid, cb) {
		  if (cb) {
		      return Refs.users.child(uid).once('value', cb);
		  }
		  else {
		      return $firebaseObject(Refs.users.child(uid));
		  }
		},
		all: function(cb) {
      var ref = Refs.users;
      if (!cb) {
        return $firebaseArray(ref);
      }
      else {
        return ref.once('value', cb);
      }
    },
	};
};

