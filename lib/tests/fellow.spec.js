var assert = require('assert');
var firebase = require('firebase');
const rootRef = new Firebase('https://brilliant-heat-5817.firebaseio.com/');
const userRef = rootRef.child('users');
fellowService = require('/app/js/services/exports/fellow')(rootRef, null);
describe('FellowService Spec',function(){

	var mockUser = {
		uid: 'happy-fellow-id',
		fullName: 'Happy Fellow',
		email: 'happy-fellow-id@andela.co'
	};

	describe('Fellow should be created',function(){

		beforeEach(function(){
			userRef.
		});

	});
	it('User should be created',function(done)){

	});


});