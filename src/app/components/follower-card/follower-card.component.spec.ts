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
      declarations: [ FollowerCardComponent ],
      providers: [{ provide: User, useValue: {
        id: 1,
        email: 'tester@gmail.com',
        firstName: 'test',
        lastName: 'user'
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

  it('Should emit a user', () => {
    component.user = user;
    const spy = spyOn(component, 'callParent');
    // spyOn(component, 'unfollow').and.callThrough();
    component.unfollow(user.id);
    expect(spy).toHaveBeenCalled();
  });
});
