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
    updateFellow: function(fellowData, cb) {
      console.log(fellowData.uid);
      var fellowData1 = angular.copy(fellowData);
      console.log(fellowData1);
      delete fellowData1.$$conf;
      delete fellowData1.$priority;
      delete fellowData1.$id;
      delete fellowData1.__proto__;
      console.log("final", fellowData1);
      rootRef.child('users').child(fellowData.uid).update(fellowData1,cb);
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
    regRequest: function(uid) {
      rootRef.child('users').child($rootScope.currentUser.uid).child('sentRequests').child(uid).push({timestamp:Firebase.ServerValue.TIMESTAMP});
      rootRef.child('users').child(uid).child('requests').child($rootScope.currentUser.uid).push({timestamp:Firebase.ServerValue.TIMESTAMP});
    },
    acceptRequest: function(mentor){
    	// var data = {};
    	// data.uid = fellow.uid;
    	// data.fullName = fellow.fullName;
    	rootRef.child('users').child($rootScope.currentUser.uid).child('mentors').child(mentor).set({timestamp:Firebase.ServerValue.TIMESTAMP});
      rootRef.child('users').child($rootScope.currentUser.uid).child('requests').child(mentor).remove();
      rootRef.child('users').child(mentor).child('sentRequests').child($rootScope.currentUser.uid).remove();
       
    }
  };
}])
.factory('MentorService', ['$firebase', '$cookies', '$stateParams', function($firebase, $cookies, $stateParams) {
  var rootRef = new Firebase($cookies.rootRef);
  return {
    readMentor: function(callback) {
      console.log($stateParams);
      var mentors = $firebase(rootRef.child('users').orderByChild('role').equalTo('-mentor-')).$asObject();
      if (callback && typeof callback === typeof
          function() {})
          mentors.$loaded().then(callback);
      return mentors;
    },
    readMyProfile: function(currentUID) {
        return $firebase(rootRef.child('users').child(currentUID)).$asObject();
    },
    readSingleMentor: function(uid) {
        if (uid) {
            console.log(uid,'readSingleMentor');
            return $firebase(rootRef.child('users').child(uid)).$asObject();
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
}])
.factory('AuthService', ['$firebase','$http',function($firebase,$http){
    return {
    user: {def: "hello"},
    allowUser : false,
    sendMail: function(id,param,cb){
      var paramsMentor = angular.copy(param);
      delete paramsMentor.$id;
      delete paramsMentor.$priority;
      $http.post('/mail/user/'+id, paramsMentor).success(function(r,s){
        if(cb)
          cb(r,s);
      });
    }
  };
}]);
