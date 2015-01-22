describe('matsi.directives test', function(){
  var Mentor,
      Fellow,
      User,
      Log,
      Utils,
      scope,
      MailService,
      ctrl;
  beforeEach(module('Matsi'));
  beforeEach(inject(function($controller, $rootScope, $injector,$cookies) {
        scope = $rootScope;
        scope.mentor_uid = 'google:happy-fellow-id';
        scope.mentor = {
          uid: 'uid',
          fullName: 'FullName'
        };
        scope.fellow = {
          uid: 'uid',
          fullName: 'FullName'
        };
        scope.currentUser = scope.fellow;
        ctrl = $controller('mentorRequestCtrl', {
            $scope: scope,
            $rootScope: scope
        });
        Mentor = $injector.get('Mentor');
        Fellow = $injector.get('Fellow');
        User = $injector.get('User');
        Log = $injector.get('Log');
        Utils = $injector.get('Utils');
        MailService = $injector.get('MailService');
    }));
   it('should accept a mentor request', function(){
    spyOn(Fellow, 'accept');
    spyOn(MailService, 'send');
    spyOn(Log, 'save');
    spyOn(Utils, 'openToast');
    scope.accept();
    expect(Fellow.accept).toHaveBeenCalled();
    expect(MailService.send).toHaveBeenCalled();
    expect(Log.save).toHaveBeenCalled();
    expect(Utils.openToast).toHaveBeenCalled();
   });

   it('should reject a mentor request', function(){
    spyOn(Fellow, 'reject');
    spyOn(MailService, 'send');
    spyOn(Log, 'save');
    spyOn(Utils, 'openToast');
    scope.reject();
    expect(Fellow.reject).toHaveBeenCalled();
    expect(MailService.send).toHaveBeenCalled();
    expect(Log.save).toHaveBeenCalled();
    expect(Utils.openToast).toHaveBeenCalled();
   });
   
   it('should set show message box to true', function(){
    scope.showMessageBox = false;
    scope.showBox();
    expect(scope.showMessageBox).toBeTruthy();
   });
});