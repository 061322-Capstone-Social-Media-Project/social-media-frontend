import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import User from '../models/User';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

import { UserProfileService } from './user-profile.service';
import { HttpParams } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Observable, tap } from 'rxjs';

describe('UserProfileService', () => {
  let service: UserProfileService;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    authService = TestBed.inject(AuthService);
    authService.currentUser = {
      id: 1,
      email: 'test',
      password: 'secret',
      username: 'test',
      professionalURL: 'test',
      firstName: 'test',
      lastName: 'test',
      profilePic: 'test',
      namePronunciation: 'test',
      location: 'test'
    };
    httpTestingController = TestBed.inject(HttpTestingController)
    service = TestBed.inject(UserProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make currentUser = authService.currentUser', () => {
    expect(service.currentUser).toEqual(authService.currentUser);
  });

  it('should make an http put method in updateUser', (done) => {
    let putUrl = service.updateURL;

    service.updateUser(service.currentUser.email,service.currentUser.password,service.currentUser.firstName,
      service.currentUser.username, service.currentUser.lastName, service.currentUser.location,
      service.currentUser.namePronunciation, service.currentUser.professionalURL, service.currentUser.id, service.currentUser.profilePic);

    const putUpdateUserRequest = httpTestingController.expectOne(`${putUrl}`);
    expect(putUpdateUserRequest.request.method).toBe("PUT");
    putUpdateUserRequest.flush({});
    httpTestingController.verify();
    done();
  });

  it('should return a user from getUserById', () => {
    let id = '1';
    let expected: Observable<User> = new Observable<User>; 
    expected.pipe(tap( user => {
      user = authService.currentUser;
    }));

    spyOn(service, 'getUserById').and.returnValue(expected);
    let actual = service.getUserById(id);
    expect(actual).toEqual(expected);
  });

  it('should use a http get method in getUserById', (done) => {
    let id = '1';
    const url = `${environment.baseUrl}/user-profile?id=${id}`;

    service.getUserById(id).subscribe();
    const getUserRequest = httpTestingController.expectOne(`${url}`);
    expect(getUserRequest.request.method).toBe("GET");
    getUserRequest.flush({});
    httpTestingController.verify();
    done();
  });

  it('should emit a search param', () => {
    let search = 'test';
    const spy = spyOn(service.searchEvent, 'emit');

    service.setSearchParam(search);
    expect(spy).toHaveBeenCalled();
    expect(service.getSearchParam()).toEqual(search);
  });

  it('it should get the searchParam from the getSearchParam method', () => {
    const spy = spyOn(service, 'getSearchParam').and.callThrough();
    //since searchParam is private, have to give a value via setter for it not to be undefined
    service.setSearchParam('truthy');

    let search = service.getSearchParam();
    expect(spy).toHaveBeenCalled();
    expect(search).toBeTruthy();
  });

  it('should return an Observable<User[]> from findUsers()', (done) => {
    let search = 'test';
    let myUsers: User[] = [{
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
      myUsers.forEach(data => {
        users.push(data);
      });
    })); 
    spyOn(service, 'findUsers').and.returnValue(expected);
    let actual = service.findUsers(search);
    expect(actual).toEqual(expected);
    done();
  });

  it('should call a http get method in findUsers', (done) => {
    let search = 'test';
    const url = `${environment.baseUrl}/search?user=${search}`;
    // let queryParams = new HttpParams().append("user", search);

    service.findUsers(search).subscribe();
    const findUsersReq = httpTestingController.expectOne(url);
    expect(findUsersReq.request.method).toBe("GET");
    findUsersReq.flush({});
    httpTestingController.verify();
    done();
  });
});
