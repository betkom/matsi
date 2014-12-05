var assert = require('assert');
var Firebase = require('firebase');
const rootRef = new Firebase('https://brilliant-heat-9512.firebaseio.com/');
var users = require('./lib/users.js')(rootRef);
describe('Mocha Backend Test',function(){

  var userSnap;
  
  
  it('Should be defined',function(){
    assert.equal(1,1);
    rootRef.on('value',function(snap){
      console.log(snap.val());
    });
    rootRef.child('users').child('google:happy-fellow-id').set({yeet:'YEET'});
    
    console.log(rootRef,'rootRef');
  });
});