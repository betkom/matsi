angular.module("matsi.services")
    .factory('Refs', ['$cookies', '$rootScope', function($cookies, $rootScope) {
        
    var firebaseConfig = {
      apiKey: "AIzaSyC0AgpduoqynosXUPy4Vg0iXgm6t2O2qH0",
      authDomain: "matsi-a555a.firebaseapp.com",
      databaseURL: "https://matsi-a555a.firebaseio.com",
      projectId: "matsi-a555a",
      storageBucket: "matsi-a555a.appspot.com",
      messagingSenderId: "267906877175",
      appId: "1:267906877175:web:19d8605d1358de0dcab5f2",
      measurementId: "G-EYJMQ0L1Y9"
    };
    // console.log(firebase, 'firebase')
    firebase.initializeApp(firebaseConfig);
    return require('./exports/refs.js')(firebase);
    }]);
