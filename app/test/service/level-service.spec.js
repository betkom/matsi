describe('level Services Test', function() {
	var Levels,
			Refs,
	 mockMentor = {
            uid: 'google:happy-mentor-uid',
            role: '-mentor-',
            fullName: 'Happy Mentor',
            email: 'happy-mentor-uid@andela.co',
            picture: 'this is pic url',
            firstName: 'happy',
            isAdmin: true
  },
	mockLevel = {
            name: 'a level',
            color: 'mock color'
  },
  $id = 'mock-level';
  beforeEach(function() {
        module('Matsi');
    });
  beforeEach(inject(function($injector, $httpBackend) {
  	Levels = $injector.get('Levels');
  	Refs = $injector.get('Refs');
  	rootScope = $injector.get('$rootScope');

  }));
  beforeEach(function(done) {
  	Refs.levels.child($id).set(mockLevel, function(err){
      done();
    });
  });

         describe('Levels service test', function(){
          it('should get all levels', function(done){
              Levels.all(function(snap){
                var levels = snap.val();
                expect(levels).toBeDefined();
                done();
              });
          });
          it('should get a level', function(done){
            Levels.find($id, function(snap){
                var level = snap.val();
                expect(level).toBeDefined();
                done();
            });
          });
          it('should update level', function(done) {
            var name = 'Happy-Level';
            
            var updateMockLevel = angular.copy(mockLevel);
            updateMockLevel.name = name;
            updateMockLevel.$id = $id;
            rootScope.currentUser = mockMentor;
            Levels.update(updateMockLevel, function(err) {
                expect(err).toBe(null);
                Levels.find($id, function(snap) {
                    var level = snap.val();
                    expect(level).not.toBe(null);
                    expect(level.name).toBe(updateMockLevel.name);
                    expect(level.name).not.toBe(mockLevel.name);
                    done();
                });
            });

        });
        });

  afterEach(function(done) {
  	Refs.levels.child($id).remove(function(err){
      expect(err).toBe(null);
    });
    done();
  });
});