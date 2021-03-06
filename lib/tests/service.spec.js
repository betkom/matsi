var assert = require('assert'),
 Firebase = require('firebase'),
firebaseRef = require('../../firebase-ref'),
_ = require('lodash'),
rootRef = new Firebase(firebaseRef.dev),
Refs = require('../../app/js/services/exports/refs')(rootRef),
Fellow = require('../../app/js/services/exports/fellow')(Refs,null),
Mentor = require('../../app/js/services/exports/mentor')(Refs,null),
User = require('../../app/js/services/exports/user')(Refs,null);

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
     Refs.users.child(happyMentor.uid).set(happyMentor,function(){
         Refs.users.child(happyFellow.uid).set(happyFellow,function(){
             done();
         });    
     });
  });
 
  describe('Fellow Service Test',function(done){
     it('Should have happy-fellow-uid online equal to mocked fellow',function(done){
       User.find(happyFellow.uid,function(snap){
         assert.equal(snap.val().uid,happyFellow.uid);
         done();
       });
     });
  });
  describe('Mentor Service Test', function(done){
    it('Should have happy-mentor-uid online equal to mocked mentor', function(done){
      User.find(happyMentor.uid,function(snap){
         console.log(snap.val(),'jjjjj');
        assert.equal(snap.val().uid,happyMentor.uid);
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
     Refs.users.child(happyFellow.uid).remove(function(){
         Refs.users.child(happyMentor.uid).remove(function(){
             console.log('Deleted Fellow, Mentor');
             done();
         });    
     });
  });
});
