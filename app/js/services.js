angular.module("matsi.services", ['firebase','ngCookies'])

.factory('FellowService',['$firebase','$cookies',function($firebase,$cookies){
	var rootRef = new Firebase($cookies.rootRef);
	// console.log($cookies);
	return {
	updateFellow:function(fellowData,currentUID){
			console.log(currentUID);
			rootRef.child('users').child(currentUID).update(fellowData);
	},
	readFellow: function(){
		return $firebase(rootRef.child('users').orderByChild('role').equalTo('-fellow-')).$asArray();
	}
	 };
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
		readSingleMentor: function(currentUID){
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
