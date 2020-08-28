module.exports = function(Refs, $rootScope, $firebaseObject) {
    return {
        save: function(params,img) {
            var logParams = angular.copy(params);
            Refs.logs.child(moment().format("YYYY-MM-DD")).push({
                value: logParams,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                uid: $rootScope.currentUser.uid, 
                icon: img
            });
        },
        allLogs: function(date, cb) {
            var logs;
            if (!cb) {
                logs = $firebaseObject(Refs.logs.child(date).limitToLast(20)).$asArray();
                return logs;
            } else {
                return Refs.logs.child(date).once('value', cb);
            }
        },
        allMentored: function(cb) {
            var fellows;
            if (!cb) {
                fellows = $firebaseObject(Refs.users.orderByChild('isMentored').equalTo(true)).$asArray();
            }
            else {
                fellows = Refs.users.orderByChild('isMentored').equalTo(true).once('value', cb);
            }
            return fellows;
        },
        allUnMentored: function(cb) {
            var fellows;
            if (!cb) {
                fellows = $firebaseObject(Refs.users.orderByChild('isMentored').equalTo(false)).$asArray();
            }
            else {
                fellows = Refs.users.orderByChild('isMentored').equalTo(false).once('value', cb);
            }
            return fellows;
        }
    };
};
