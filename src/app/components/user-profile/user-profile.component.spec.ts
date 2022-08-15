import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FollowerService } from 'src/app/services/follower.service';
import { PostService } from 'src/app/services/post.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UserProfileComponent } from './user-profile.component';
import { HobbyService } from 'src/app/services/hobby.service';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let authService: AuthService;
  let userProfileService: UserProfileService;
  let postService: PostService;
  let followerService: FollowerService;
  let activatedRoute: ActivatedRoute;
  let hobbyService: HobbyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ UserProfileComponent ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    component.user = {
      id: 1,
      email: 'test',
      password: 'test',
      firstName: 'test',
      lastName: 'test',
      location: 'test',
      professionalURL: 'test',
      namePronunciation: 'test',
      profilePic: 'test',
      username: 'test'
    };
    authService = TestBed.inject(AuthService);
    authService.currentUser = component.user;
    activatedRoute = TestBed.inject(ActivatedRoute);
    userProfileService = TestBed.inject(UserProfileService);
    postService = TestBed.inject(PostService);
    followerService = TestBed.inject(FollowerService);
    hobbyService = TestBed.inject(HobbyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call queryParams and subscribe on init', () => {
    const router = jasmine.createSpyObj('Router', ['queryParams']);
    const spy = spyOn(activatedRoute.queryParams, 'subscribe');
    router.queryParams = of({});
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to update-user', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.updateUser();
    expect(spy).toHaveBeenCalled();
  });
});