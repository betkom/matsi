describe('mentor Request directive', function() {
    beforeEach(module('Matsi'));
    beforeEach(inject(function($controller, $rootScope, $httpBackend) {
        scope = $rootScope.$new();
    }));
    it('should create my directives', inject(function($rootScope, $compile, $log, $httpBackend) {
        var fakedMainResponse = 'testing';
        $httpBackend.when('GET', '/pages/mentor-request.html').respond(fakedMainResponse);
        var el = angular.element("<mentor-request></mentor-request>");
        $compile(el)($rootScope);
        scope.$digest();
        expect($log.assertEmpty).not.toThrow();
        expect(1).toEqual(1);
    }));
});
