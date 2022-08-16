import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { FollowerService } from 'src/app/services/follower.service';
import { PostService } from 'src/app/services/post.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UserProfileComponent } from './user-profile.component';
import { HobbyService } from 'src/app/services/hobby.service';
import { environment } from 'src/environments/environment';
describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let authService: AuthService;
  let userProfileService: UserProfileService;
  let postService: PostService;
  let followerService: FollowerService;
  let activatedRoute: ActivatedRoute;
  let hobbyService: HobbyService;
  let user: User;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [UserProfileComponent],
      providers: [{
        provide: AuthService, useValue: {
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
        }
      }]
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
    fixture.detectChanges();
    activatedRoute = TestBed.inject(ActivatedRoute);
    userProfileService = TestBed.inject(UserProfileService);
    postService = TestBed.inject(PostService);
    followerService = TestBed.inject(FollowerService);
    hobbyService = TestBed.inject(HobbyService);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call queryParams and subscribe on init', () => {
    const router = jasmine.createSpyObj('Router', ['queryParams']);
    const spy = spyOn(activatedRoute.queryParams, 'subscribe');
    router.queryParams = of({});
    authService.currentUser = {
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
    component.user = authService.currentUser;
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should getUserById and grab following counts and subscribe on init', () => {
    const spy = spyOn(userProfileService, 'getUserById').and.returnValue(of(component.user));
    const spy2 = spyOn(userProfileService.getUserById('1'), 'subscribe').and.callThrough();
    let expectedData = of(true);
    let actualData = new Observable<boolean>();
    const spy3 = spyOn(followerService, 'isFollowing').and.callFake( (userId:number) => {
        actualData = expectedData;
        userId = 1;
        return actualData;
    });
    let expectedCount = of(2);
    let actualCount = new Observable<number>();
    const spy4 = spyOn(followerService, 'getCount').and.callFake( (userId:string) => {
        actualCount = expectedCount;
        userId = '1';
        return actualCount;
    });
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
    expect(spy4).toHaveBeenCalled();
    expect(actualData).toEqual(expectedData);
    expect(actualCount).toEqual(expectedCount);
  });

  it('should getAllHobbies and subscribe on init', () => {
    const spy = spyOn(hobbyService, 'getAllHobbies').and.returnValue(of());
    const spy2 = spyOn(hobbyService.getAllHobbies('1'), 'subscribe').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('getAllHobbies should do nothing if response is null', () => {
    const spy = spyOn(hobbyService, 'getAllHobbies').and.returnValue(of());
    const spy2 = spyOn(hobbyService.getAllHobbies('1'), 'subscribe').and.callThrough();
    component.hobby1 = 'hobby1';
    component.hobby2 = 'hobby2';
    component.hobby3 = 'hobby3';
    component.ngOnInit();
    expect(component.hobby1).toEqual('hobby1');
    expect(component.hobby2).toEqual('hobby2');
    expect(component.hobby3).toEqual('hobby3');
  });

  it('getAllHobbies should set hobby1, hobby2, and hobby3 if response is not null', () => {
    const spy = spyOn(hobbyService, 'getAllHobbies').and.returnValue(of({
      id: 1,
      hobby1: 'test1',
      hobby2: 'test2',
      hobby3: 'test3'
    }));
    spyOn(hobbyService.getAllHobbies('1'), 'subscribe').and.callThrough();
    component.hobby1 = 'hobby1';
    component.hobby2 = 'hobby2';
    component.hobby3 = 'hobby3';
    component.ngOnInit();
    expect(component.hobby1).toEqual('test1');
    expect(component.hobby2).toEqual('test2');
    expect(component.hobby3).toEqual('test3');
  });

  it('should getAllPosts and subscribe on init', () => {
    const spy = spyOn(postService, 'getAllPosts').and.returnValue(of([]));
    const spy2 = spyOn(postService.getAllPosts(), 'subscribe').and.callThrough();
    let expectedData: any = [];
    component.ngOnInit();
    let actualData = component.posts;
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(actualData).toEqual(expectedData);
  });

  it('should navigate to update-user when updateUser is called', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.updateUser();
    expect(spy).toHaveBeenCalled();
  });

  it('should addFollowing count on follow call and subscribe', () => {
    const spy = spyOn(followerService, 'addFollowing').and.returnValue(of(true));
    const spy2 = spyOn(followerService.addFollowing(1), 'subscribe').and.callThrough();
    const spy3 = spyOn(component, 'ngOnInit');
    component.follow();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });

  it('should removeFollowing count on unfollow call and subscribe', () => {
    const spy = spyOn(followerService, 'removeFollowing').and.returnValue(of(true));
    const spy2 = spyOn(followerService.removeFollowing(1), 'subscribe').and.callThrough();
    const spy3 = spyOn(component, 'ngOnInit');
    component.unfollow();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });

  it('should have a following user that will be equal to this user on ngOnDestroy', () => {
    component.user = component.loggedInUser;
    component.ngOnDestroy();
    expect(followerService.user).toEqual(component.user);
  });
});