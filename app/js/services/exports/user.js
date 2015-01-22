module.exports = function(Refs, $rootScope, $firebase) {
  return {
		find: function(uid, cb) {
		  if (cb) {
		      return Refs.users.child(uid).once('value', cb);
		  }
		  else {
		      return $firebase(Refs.users.child(uid)).$asObject();
		  }
		},
		all: function(cb) {
      var ref = Refs.users;
      if (!cb) {
        return $firebase(ref).$asArray();
      }
      else {
        return ref.once('value', cb);
      }
    },
	};
};

