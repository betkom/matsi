angular.module("matsi.services", ['firebase','ngCookies'])

.factory('FellowService',['$firebase','$cookies',function($firebase,$cookies){
	var rootRef = new Firebase($cookies.rootRef);
	console.log($cookies);
	return {

	// 	create:function(stuff){
	// 		rootRef.child('stuff').push(stuff);
	// 	},
		readFellow: function()
		{
			return $firebase(rootRef.child('users').orderBy('role').equalTo('-fellow-')).$asArray();
		}
	// 	createItems:function(item){
	// 		rootRef.child('item').push(item);
	// 	},
	// 	readItems: function()
	// 	{
	// 		return $firebase(rootRef.child('item').child(' -Jb6cvofk70B9T-T6bzP')).$asArray();
	// 	}
	 };
}]);
