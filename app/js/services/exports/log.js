module.exports = function(rootRef, $rootScope, $firebase) {
    return {
        save: function(params) {
            var logParams = angular.copy(params);
            rootRef.child('logs').child(moment().format("YYYY-MM-DD")).push(logParams);
        },
        allLogs: function(date,cb) {
            var logs;
            if (!cb) {
                 logs = $firebase(rootRef.child('logs').child(date).limitToLast(20)).$asArray();
                return logs; 

            }
        },
        allMentored: function(cb) {
            var fellows;
            if (!cb)
                fellows = $firebase(rootRef.child('users').orderByChild('isMentored').equalTo(true)).$asArray();
            else
                fellows = rootRef.child('users').orderByChild('isMentored').equalTo(true).once('value', cb);
            return fellows;
        },
        allUnMentored: function(cb){
           var fellows;
            if (!cb)
                fellows = $firebase(rootRef.child('users').orderByChild('isMentored').equalTo(false)).$asArray();
            else
                fellows = rootRef.child('users').orderByChild('isMentored').equalTo(false).once('value', cb);
            return fellows;
        }
    };
};
