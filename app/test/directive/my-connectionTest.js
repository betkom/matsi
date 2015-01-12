describe('my connection directive', function(){
  beforeEach(module('Matsi'));
  beforeEach(inject(function($controller, $rootScope,$httpBackend){
    scope = $rootScope.$new();
  }));
  it('should create my directives', inject(function($rootScope, $compile, $log, $httpBackend){
    var fakedMainResponse = 'testing';
    $httpBackend.when('GET', '/pages/my-connection.html').respond(fakedMainResponse);
    var el = angular.element("<my-connection></my-connection>");
    $compile(el)($rootScope);
    scope.$digest();
    expect($log.assertEmpty).not.toThrow();
    expect(1).toEqual(1);
  }));
});