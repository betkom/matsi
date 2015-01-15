describe('my connection directive', function() {
    var el = angular.element("<my-connection></my-connection>");
    var fakedMainResponse = 'testing';
    beforeEach(module('Matsi'));
    beforeEach(inject(function($controller, $rootScope, $httpBackend, $injector, $compile) {
        scope = $rootScope.$new();
        $compile(el)($rootScope);
    }));
    it('should create my directives', inject(function($rootScope, $log, $httpBackend) {
        $httpBackend.when('GET', '/pages/my-connection.html').respond(fakedMainResponse);
        scope.$digest();
        expect($log.assertEmpty).not.toThrow();
    }));
});
