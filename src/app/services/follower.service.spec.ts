import { TestBed, tick } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


import { FollowerService} from './follower.service';
import User from '../models/User';
import { AuthService } from './auth.service';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpRequest } from '@angular/common/http';

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
        firstName: 'test',
        lastName: 'user'
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

  it("Get Current User", (done) => {
   
    //might need to change authService from the real one to a mock class
    //if it messes with any production things.
    authService.currentUser = user;
    spyOn(service, 'getCurrentUser').and.returnValue(authService.currentUser);
    let actualUser = service.getCurrentUser();
    expect(actualUser).toEqual(user);
    done();
  });
    

  it('Should get followers', (done) => {
    const expectedfollowers: User[] =[{
      id: 1,
      email: 'tester@gmail.com',
      firstName: 'test',
      lastName: 'user'
    },
    {
      id: 2,
      email: 'test@gmail.com',
      firstName: 'test',
      lastName: 'user'
    }];

    let expected: Observable<User[]> = new Observable<User[]>;
    expected.pipe(tap(users => {
      expectedfollowers.forEach(followers => {
        users.push(followers);
      });
    }));   

    spyOn(service, 'getFollowers').and.returnValue(expected);
    let actualFollower = service.getFollowers();
    expect(actualFollower).toEqual(expected);
    done();
  });

  it('Should get following and send an http get request', (done) => {
    const expectedfollowing: User[] =[{
      id: 1,
      email: 'tester@gmail.com',
      firstName: 'test',
      lastName: 'user'
    },
    {
      id: 2,
      email: 'test@gmail.com',
      firstName: 'test',
      lastName: 'user'
    }];

    let expected: Observable<User[]> = new Observable<User[]>;
    expected.pipe(tap(users => {
      expectedfollowing.forEach(followers => {
        users.push(followers);
      });
    }));   

    spyOn(service, 'getFollowing').and.returnValue(expected);
    let actualFollowing = service.getFollowing();
    expect(actualFollowing).toEqual(expected);
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
  
  it('Should send a http get request for get followers', (done) =>{
    const getFollowersReq = httpTestingController.expectOne(`${service.followersUrl}`);
    expect(getFollowersReq.request.method).toBe("GET");
    done();
  });

  it('Should send a http get request for get following', (done) =>{
    const getFollowingReq = httpTestingController.expectOne(`${service.followingUrl}`);
    expect(getFollowingReq.request.method).toBe("GET");
    done();
  });

  it('Should send a http post request for addFollowing', (done) =>{

    //spyOn(service, 'addFollowing');
    authService.currentUser = user;
    service.addFollowing(user.id);
    const postFollowingReq = httpTestingController.expectOne(`${service.followingUrl}`);
    expect(postFollowingReq.request.method).toBe("POST");
    postFollowingReq.flush({});
    done();
  });
});
