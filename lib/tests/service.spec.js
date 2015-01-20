var assert = require('assert');
var Firebase = require('firebase');
var firebaseRef = require('../../firebase-ref');
var _ = require('lodash');
const rootRef = new Firebase(firebaseRef.dev);
const Refs = require('../../app/js/services/exports/refs')(rootRef);
const Fellow = require('../../app/js/services/exports/fellow')(Refs.rootRef,null);
const Mentor = require('../../app/js/services/exports/mentor')(Refs.rootRef,null);

describe('Mocha Backend Test',function(){

  var userSnap,
  happyFellow = {
   name: 'Happy Fellow',
   role: '-fellow-',
   uid: 'google:happy-fellow-uid',
  },
  happyMentor = {
   name: 'Happy Mentor',
   role: '-mentor-',
   uid: 'google:happy-mentor-uid'
  };
 
  beforeEach(function(done){
     Refs.rootRef.child('users').child(happyMentor.uid).set(happyMentor,function(){
         Refs.rootRef.child('users').child(happyFellow.uid).set(happyFellow,function(){
             console.log('Created Fellow, Mentor');
             done();
         });    
     });
  });
 
  describe('Fellow Service Test',function(done){
     it('Should have happy-fellow-uid online equal to mocked fellow',function(done){
       Fellow.findOne(happyFellow.uid,function(snap){
         assert.equal(snap.val().uid,happyFellow.uid);
         console.log('Testing Fellow uid:'+happyFellow.uid);
         done();
       });
     });
  });
  describe('Mentor Service Test', function(done){
    it('Should have happy-mentor-uid online equal to mocked mentor', function(done){
      Mentor.findOne(happyMentor.uid,function(snap){
        assert.equal(snap.val().uid,happyMentor.uid);
        console.log('Testing Mentor uid:' +happyMentor.uid);
        done();
      });
    });
    it('should get all mentors',function(done){
      Mentor.all(function(snap){
        var mentors = [];//_(snap.val()).toArray();
        var mentorsObject = snap.val();
        for(var i in mentorsObject)
          mentors.push(mentorsObject[i]);
        assert.notEqual(mentors.length,0);
        done();
      });
    });
  });

  afterEach(function(done){
     Refs.rootRef.child('users').child(happyFellow.uid).remove(function(){
         Refs.rootRef.child('users').child(happyMentor.uid).remove(function(){
             console.log('Deleted Fellow, Mentor');
             done();
         });    
     });
  });
});
