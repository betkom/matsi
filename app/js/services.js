angular.module("matsi.services", ['firebase', 'ngCookies'])
.factory('FellowService', ['$firebase', '$cookies', '$stateParams','$rootScope', function($firebase, $cookies, $stateParams, $rootScope) {
  var rootRef = new Firebase($cookies.rootRef);
  // rootRef.__proto__.orderByChild = rootRef.__proto__.orderByChild || function(x){
  // 	return this;
  // };
  // rootRef.__proto__.equalTo = rootRef.__proto__.equalTo || function(x){
  // 	return this;
  // };
  // console.log($cookies);
  return {
    updateFellow: function(fellowData, currentUID) {
      console.log(currentUID);
      var fellowData1 = angular.copy(fellowData);
      console.log(fellowData1);
      delete fellowData1.$$conf;
      delete fellowData1.$priority;
      delete fellowData1.$id;
      delete fellowData1.__proto__;
      //console.log("final", fellowData1);
      rootRef.child('users').child(currentUID).update(fellowData1);
    },
    readFellow: function() {
      return $firebase(rootRef.child('users').orderByChild('role').equalTo('-fellow-')).$asObject();
    },
    readMyProfile: function(currentUID) {
        return $firebase(rootRef.child('users').child(currentUID)).$asObject();
    },
    readSingleFellow: function(uid) {
      if (uid) {
          return $firebase(rootRef.child('users').child(uid)).$asObject();
      }
    },
    mentorConstraint: function() {
                // console.log($stateParams.uid,"awh yeah")
                var data = {};
                var result = $firebase(rootRef.child('users').child($stateParams.uid)).$asObject();
                var check = result.$loaded().then(function(response) {
                    data = response;
                    if (data.isMentored === true) {
                        var unMentoredFellows = $firebase(rootRef.child('users').orderByChild('isMentored').equalTo('false')).$asArray();
                        console.log(unMentoredFellows.length);
                        if (unMentoredFellows.length > 0) {
                            alert("Sorry this fellow already has a mentor, all other fellows must have mentors");
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                });

                return check;
            },
    regRequest: function(fellow) {
      rootRef.child('users').child($rootScope.currentUser.uid).child('sentRequests').child(fellow.uid).push({timestamp:Firebase.ServerValue.TIMESTAMP, message:fellow.message});
      rootRef.child('users').child(fellow.uid).child('requests').child($rootScope.currentUser.uid).set({timestamp:Firebase.ServerValue.TIMESTAMP, message:fellow.message});
    },
    acceptRequest: function(mentor){
    	rootRef.child('users').child($rootScope.currentUser.uid).child('mentors').child(mentor.uid).set({timestamp:Firebase.ServerValue.TIMESTAMP});
      rootRef.child('users').child($rootScope.currentUser.uid).update({isMentored: true});
      rootRef.child('users').child(mentor.uid).child('fellows').child($rootScope.currentUser.uid).set({timestamp:Firebase.ServerValue.TIMESTAMP});
      rootRef.child('users').child($rootScope.currentUser.uid).child('requests').child(mentor.uid).remove();
      rootRef.child('users').child(mentor.uid).child('sentRequests').child($rootScope.currentUser.uid).remove();
    },
    rejectRequest: function(mentor){
      rootRef.child('users').child(mentor.uid).child('sentRequests').child($rootScope.currentUser.uid).update({message: mentor.message});
      rootRef.child('users').child($rootScope.currentUser.uid).child('requests').child(mentor.uid).remove();
    }
  };
}])
.factory('MentorService', ['$firebase', '$cookies', '$stateParams', function($firebase, $cookies, $stateParams) {
  var rootRef = new Firebase($cookies.rootRef);
  return {
    readMentor: function(callback) {
      console.log($stateParams);
      var mentors = $firebase(rootRef.child('users').orderByChild('role').equalTo('-mentor-')).$asArray();
      if (callback && typeof callback === typeof function() {})
          mentors.$loaded().then(callback);
      return mentors;
    },
    readMyProfile: function(currentUID) {
        return $firebase(rootRef.child('users').child(currentUID)).$asObject();
    },
    readSingleMentor: function(uid,cb) {
        if (uid) {
            console.log(uid,'readSingleMentor');
        var mentor = $firebase(rootRef.child('users').child(uid)).$asObject()
              
        if(cb){
            mentor.$loaded().then(function(value){
              cb(value);
            });
        }
        return mentor;
      }
    },
    updateMentor: function(mentorData, currentUId) {
      mentorData1 = angular.copy(mentorData)
      delete mentorData1.$$conf;
      delete mentorData1.$id;
      delete mentorData1.$priority;
      delete mentorData1._proto_;
      rootRef.child('users').child(currentUId).update(mentorData1);
    }
  };
}]);

