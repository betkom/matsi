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
		readSingleMentor: function(currentUId){
			return $firebase(rootRef.child('users').orderByChild('uid').equalTo(currentUId)).$asObject();ß
		},
		readMentor: function(){
			return $firebase(rootRef.child('users').orderByChild('role').equalTo('-mentor-')).$asArray();
		},
		updateMentor: function(mentorData, currentUId){
			 rootRef.child('users').child(currentUId).update(mentorData);
		}
	};
}]);
