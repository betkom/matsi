var Firebase = require("firebase");
var _ = require("lodash");

var User = function(snap) {
  var user = snap.val();
  this.rootRef = snap.ref().root();
  if(user) {
    this.id = snap.key();
    this.name = user.name;
    this.email = user.email;
    this.data - snap.val();
  }
}

module.exports = function(rootRef) {
  this.find = function(uid) {
    uid = uid || 'google:100424084914655768945';
    var userRef = rootRef.child('users').child(uid);
    userRef.once('value', function(snap) {
      cb(new User(snap));
    });
  };
}