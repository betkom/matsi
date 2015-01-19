describe('my connection directive', function() {
    var el = angular.element("<my-connections></my-connections>");
    var fakedMainResponse = 'testing';
    var Mentor,
        Fellow;
    beforeEach(module('Matsi'));
    beforeEach(inject(function($controller, $rootScope, $httpBackend, $injector, $compile) {
        scope = $rootScope.$new();
        Mentor = $injector.get('Mentor');
        Fellow = $injector.get('Fellow');
        $compile(el)($rootScope);
    }));
    it('should create my directives', inject(function($rootScope, $log, $httpBackend) {
        $httpBackend.when('GET', '/pages/my-connections.html').respond(fakedMainResponse);
        scope.$digest();
        expect($log.assertEmpty).not.toThrow();
        var links = el.find('a');
        expect(links.length).toEqual(0);
    }));
});
