import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let authService: AuthService;
  let fixture: ComponentFixture<UserCardComponent>;
  let us: UserProfileService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCardComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    authService.currentUser = {
      id: 1,
      username: 'test',
      password: 'test',
      firstName: 'test',
      lastName: 'test',
      email: 'test',
      professionalURL: 'test',
      namePronunciation: 'test',
      profilePic: 'test',
      location: 'test'
    }
    us = TestBed.inject(UserProfileService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set user to the currentUser returned by the userService', () => {
    spyOn(us, 'getUserById').and.returnValue(of(authService.currentUser));
    component.ngOnInit();
    expect(component.user).toEqual(authService.currentUser);
  });
});
