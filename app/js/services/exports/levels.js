module.exports = function($firebaseObject, $firebaseArray, $rootScope, Refs) {
  return {
    all: function(cb) {
      var levels = firebase.database().ref('levels')
       console.log(Refs, 'refs')
            if (cb) {
              return levels.once('value', cb);
            }
            else {
              return $firebaseArray(levels);
            }
        },
    find: function(id, cb) {
      var ref = firebase.database().ref('levels')
      if (cb) {
          return ref.child(id).once('value', cb);
      }
      else {
          return $firebaseObject(ref.child(id));
      }
    },

    create: function(level, cb) {
      cb = cb|| function(){};
      if($rootScope.currentUser.isAdmin) {
        firebase.database().ref('levels').child(level.$id).set({
          name: level.name,
          color: level.color
        }, cb);
      }
    },

    delete: function(level){
      
      if($rootScope.currentUser.isAdmin){
        firebase.database().ref('levels').child(level.$id).remove();
      }
    },
     update: function(level, cb) {
      cb = cb || function() {};
      if($rootScope.currentUser.isAdmin) {
        firebase.database().ref('levels').child(level.$id).update({name:level.name, color: level.color}, cb);
      }
     }

  };  
};
