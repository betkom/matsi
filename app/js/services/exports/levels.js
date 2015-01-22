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
            if (cb) {
                return Refs.levels.child(id).once('value', cb);
            }
            else {
                return $firebase(Refs.levels.child(id)).$asObject();
            }
        }
  };  
};
