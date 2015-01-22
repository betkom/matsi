module.exports = function($firebase, $rootScope, Refs) {
  return {
		findOne: function(uid, cb) {
		  if (cb) {
		      return Refs.users.child(uid).once('value', cb);
		  }
		  else {
		  	console.log(Refs.users, 'yipeee');
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

