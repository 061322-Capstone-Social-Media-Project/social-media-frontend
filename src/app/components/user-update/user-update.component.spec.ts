import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NonNullableFormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import Hobby from 'src/app/models/Hobby';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { HobbyService } from 'src/app/services/hobby.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

import { UserUpdateComponent } from './user-update.component';

describe('UserUpdateComponent', () => {
  let component: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [UserUpdateComponent],
      providers: [AuthService, HobbyService, UserProfileService]
    })
      .compileComponents();

      authService = TestBed.inject(AuthService);
      authService.currentUser = {
        id: 1,
        email: 'tester@gmail.com',
        password: 'secret',
        firstName: 'test',
        lastName: 'user',
        profilePic: 'none',
        username: 'tester',
        professionalURL: 'none',
        location: 'testville',
        namePronunciation: 'test'
      };

    fixture = TestBed.createComponent(UserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call userService updateUser() when updateUser is called', () => {
    const userService = TestBed.inject(UserProfileService);
    spyOn(userService, 'updateUser');
    component.updateUser();
    expect(userService.updateUser).toHaveBeenCalled();
  });

  it('should call hobbyService.createHobby when isNullLobby === true', () => {
    const hobbyService = TestBed.inject(HobbyService);
    const userService = TestBed.inject(UserProfileService);
    spyOn(hobbyService, 'createHobby');
    spyOn(userService, 'updateUser');
    component.isNullHobby = true;
    component.updateUser();
    expect(hobbyService.createHobby).toHaveBeenCalled();
  });

  it('should call hobbyService.updateUserHobbies when isNullLobby === false', () => {
    const hobbyService = TestBed.inject(HobbyService);
    const userService = TestBed.inject(UserProfileService);
    spyOn(hobbyService, 'updateUserHobbies');
    spyOn(userService, 'updateUser');
    component.isNullHobby = false;
    component.updateUser();
    expect(hobbyService.updateUserHobbies).toHaveBeenCalled();
  });

  it('should call hobbyService.getAllHobbies and subscribe in ngOnInit', () => {
    const hobbyService = TestBed.inject(HobbyService);
    spyOn(hobbyService, 'getAllHobbies').and.returnValue(new Observable<Hobby>());
    spyOn(hobbyService.getAllHobbies('1'), 'subscribe');
    component.ngOnInit();
    expect(hobbyService.getAllHobbies).toHaveBeenCalled();
    expect(hobbyService.getAllHobbies('1').subscribe).toHaveBeenCalled();
  });

  it('should have the properties of the currentUser', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect( component.currentUser ).toEqual( authService.currentUser );
  });


  
})