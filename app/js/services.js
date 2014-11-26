angular.module("matsi.services", ['firebase','ngCookies'])

.factory('FellowService',['$firebase','$cookies',function($firebase,$cookies){
	var rootRef = new Firebase($cookies.rootRef);
	// rootRef.__proto__.orderByChild = rootRef.__proto__.orderByChild || function(x){
	// 	return this;
	// };
	// rootRef.__proto__.equalTo = rootRef.__proto__.equalTo || function(x){
	// 	return this;
	// };
	// console.log($cookies);
	return {
	updateFellow:function(fellowData,currentUID){
			console.log(currentUID);
			var fellowData1 =angular.copy(fellowData);
			console.log(fellowData1);
			delete fellowData1.$$conf;
			delete fellowData1.$priority;
			delete fellowData1.$id;
			delete fellowData1.__proto__;
			console.log("final",fellowData1);
			rootRef.child('users').child(currentUID).update(fellowData1);
	},
	readFellow: function(){

		return $firebase(rootRef.child('users').orderByChild('role').equalTo('-fellow-')).$asObject();
	},
	readMyProfile: function(currentUID){
		return $firebase(rootRef.child('users').child(currentUID)).$asObject();
	}
	 }
	
}])
.factory('MentorService', ['$firebase', '$cookies', function($firebase,$cookies){
	var rootRef = new Firebase($cookies.rootRef);


	return {
		readMentor: function(callback){ 
			var mentors = $firebase(rootRef.child('users').orderByChild('role').equalTo('-mentor-')).$asArray();
			if(callback && typeof callback === typeof function(){})
				mentors.$loaded().then(callback);
			return mentors;
		},
		readMyProfile: function(currentUID){
			 return $firebase(rootRef.child('users').child(currentUID)).$asObject();
		},
		updateMentor: function(mentorData, currentUId){
			mentorData1 = angular.copy(mentorData)
			delete mentorData1.$$conf;
			delete mentorData1.$id;
			delete mentorData1.$priority;
			delete mentorData1._proto_;
			rootRef.child('users').child(currentUId).update(mentorData1);
		}
	};
}]);
