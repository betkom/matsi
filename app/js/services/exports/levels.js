module.exports = function($firebase, $rootScope, Refs) {
  return {
    all: function(cb) {
            if (cb) {
              return Refs.levels.once('value', cb);
            }
            else {
              return $firebase(Refs.levels).$asArray();
            }
        }
  };  
};
