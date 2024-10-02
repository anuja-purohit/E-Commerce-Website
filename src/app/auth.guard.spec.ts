import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { UserService } from './services/user.service';
import { RouterTestingModule } from '@angular/router/testing';

class MockUserService {
  getUser() {
    return { name: 'Test User' }; 
  }
}

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let userService: UserService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow activation if user is logged in', () => {
    spyOn(userService, 'getUser').and.returnValue({ name: 'Test User' });
    expect(authGuard.canActivate()).toBe(true);
  });

  it('should not allow activation if user is not logged in', () => {
    spyOn(userService, 'getUser').and.returnValue(null);
    expect(authGuard.canActivate()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
