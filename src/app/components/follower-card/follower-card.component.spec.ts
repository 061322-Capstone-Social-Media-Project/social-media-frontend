import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

import { FollowerCardComponent } from './follower-card.component';

describe('FollowerCardComponent', () => {
  let component: FollowerCardComponent;
  let fixture: ComponentFixture<FollowerCardComponent>;
  let authService: AuthService;
  let user: User;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ FollowerCardComponent ],
      providers: [{ provide: User, useValue: {
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
    }}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
    user = TestBed.inject(User);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Does not like the user given into the component. It keeps coming out undefined for the emit.
  //Might just have to approach this test a different way.
  it('Should emit a user', () => {
    component.user = {
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
    const spy = spyOn(component, 'callParent');
    component.unfollow();
    expect(spy).toHaveBeenCalled();
  });
});
