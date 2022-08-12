import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


import { FollowerService} from './follower.service';
import User from '../models/User';
import { AuthService } from './auth.service';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('FollowerService', () => {
  let service: FollowerService;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let user: User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
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
    });
    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(FollowerService);
    authService = TestBed.inject(AuthService);
    user = TestBed.inject(User);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
    
  it('Should get users', (done) => {
    const expectedfollowers: User[] =[{
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
    },
    {
      id: 2,
      email: 'tester@gmail.com',
      password: 'secret',
      firstName: 'test',
      lastName: 'user',
      profilePic: 'none',
      username: 'tester',
      professionalURL: 'none',
      location: 'testville',
      namePronunciation: 'test'
    }];

    let expected: Observable<User[]> = new Observable<User[]>;
    expected.pipe(tap(users => {
      expectedfollowers.forEach(followers => {
        users.push(followers);
      });
    }));   

    spyOn(service, 'getUsers').and.returnValue(expected);
    let actualFollower = service.getUsers('test');
    expect(actualFollower).toEqual(expected);
    done();
  });

  it('Follow another User', (done) => {
    const expectedResponse = 'Success';

    let expectedObserve: Observable<any> = new Observable<any>;
    expectedObserve.pipe(tap(response => {
      response.push(expectedResponse);
    }));

    spyOn(service, 'addFollowing').and.returnValue(expectedObserve);

    //user id should not matter since we are telling addFollowing what to return
    let actualObserve = service.addFollowing(0);
    expect(actualObserve).toEqual(expectedObserve);
    done();
  });

  it('unfollowing another user', (done) => {
    const expectedRemoveRespsonse = 'Removed';

    let expectedRemove: Observable<any> = new Observable<any>;
    expectedRemove.pipe(tap(response => {
      response.push(expectedRemoveRespsonse);
    }));

    spyOn(service, 'removeFollowing').and.returnValue(expectedRemove);

    //user id should not matter since we are telling removeFollower what to respond with
    let actualRemove = service.removeFollowing(0);
    expect(actualRemove).toEqual(expectedRemove);
    done();
  });
  
  it('Should send a http get request for get users', (done) =>{
    let getUrl = `${environment.baseUrl}/followers/user/1`;
    service.getUsers(getUrl).subscribe();
    const getFollowersReq = httpTestingController.expectOne(getUrl);
    expect(getFollowersReq.request.method).toBe("GET");

    //Just returning an empty body for the request, as we just want to verify the 
    //http request is called, not that anything is returned.
    getFollowersReq.flush({});
    httpTestingController.verify();
    done();
  });

  it('Should send a http get request for get count', (done) =>{
    let getUrl = `${environment.baseUrl}/following/user/1/count`;
    service.getCount(getUrl).subscribe();
    const getFollowingReq = httpTestingController.expectOne(`${getUrl}`);
    expect(getFollowingReq.request.method).toBe("GET");

    //Just returning an empty body for the request, as we just want to verify the 
    //http request is called, not that anything is returned.
    getFollowingReq.flush({});
    done();
  });

  it('Should send a http post request for addFollowing', (done) =>{

    authService.currentUser = user;
    service.addFollowing(user.id).subscribe();
    const postFollowingReq = httpTestingController.expectOne(`${service.followingUrl}`);
    expect(postFollowingReq.request.method).toBe("POST");

    //Just returning an empty body for the request, as we just want to verify the 
    //http request is called, not that anything is returned.
    postFollowingReq.flush({});
    done();
  });

  it('Should sent a http delete request for removeFollowing', (done) => {

    authService.currentUser = user;
    service.removeFollowing(user.id).subscribe();
    const deleteFollowingRequest = httpTestingController.expectOne(`${service.followingUrl}`);
    expect(deleteFollowingRequest.request.method).toBe("DELETE");

    //Just returning an empty body for the request, as we just want to verify the 
    //http request is called, not that anything is returned.
    deleteFollowingRequest.flush({});
    done();
  });
});
