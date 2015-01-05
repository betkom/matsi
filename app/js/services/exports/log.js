module.exports = function(rootRef, $rootScope, $firebase) {
  return {
    save: function(params){
      var logParams = angular.copy(params);
      rootRef.child('logs').child('log').push(logParams);
    },
    mentored: function(params){
      var logParams = angular.copy(params);
      rootRef.child('logs').child('mentored').push(logParams);
      //activityLog.push(logParams); 
    }
  };
};