module.exports = function($firebase, $rootScope, Refs) {
  return {
    all: function(cb) {
            if (cb) {
              return Refs.levels.once('value', cb);
            }
            else {
              return $firebase(Refs.levels).$asArray();
            }
        },
    find: function(id, cb) {
      var ref = Refs.levels;
      if (cb) {
          return ref.child(id).once('value', cb);
      }
      else {
          return $firebase(ref.child(id)).$asObject();
      }
    },

    create: function(level, cb) {
      cb = cb|| function(){};
      if($rootScope.currentUser.isAdmin) {
        Refs.levels.child(level.$id).set({
          name: level.name,
          color: level.color
        }, cb);
      }
    },

    delete: function(level){
      if($rootScope.currentUser.isAdmin){
        Refs.levels.child(level.$id).remove();
      }
    },
     update: function(level, cb) {
      cb = cb || function() {};
      if($rootScope.currentUser.isAdmin) {
        Refs.levels.child(level.$id).update({name:level.name, color: level.color}, cb);
      }
     }

  };  
};
