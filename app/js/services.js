angular.module("matsi.services", ['firebase','ngCookies'])

.factory('FellowService',['$firebase','$cookies',function($firebase,$cookies){
	var rootRef = new Firebase($cookies.rootRef);
	// console.log($cookies);
	return {
		readFellow: function()
		{
			return $firebase(rootRef.child('users').orderByChild('role').equalTo('-fellow-')).$asArray();
		}
	 };
}])
.factory('MentorService', ['$firebase', '$cookies', function($firebase,$cookies){
	var rootRef = new Firebase($cookies.rootRef);

	return {
		readMentor: function(){
			return $firebase(rootRef.child('users').orderByChild('role').equalTo('-mentor-')).$asArray();
		},
		updateMentor: function(mentorData, currentUId){
			 rootRef.child('users').child(currentUId).update(mentorData);
		}
	};
}]);
