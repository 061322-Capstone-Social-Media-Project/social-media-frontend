import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import User from '../models/User';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

import { UserProfileService } from './user-profile.service';
import { HttpParams } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

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

  it('should use a get method to return a user', (done) => {
    const url = `${environment.baseUrl}/user-profile`;

    service.getUserById('1');
    const getUserRequest = httpTestingController.expectOne(`${url}`);
    expect(getUserRequest.request.method).toBe("GET");
    getUserRequest.flush({});
    httpTestingController.verify();
    done();
  });

  it('should emit a search param', () => {
    let search = 'test';
    const spy = spyOn(service, 'searchEvent').and.returnValue(new EventEmitter());
    const spy2 = spyOn(service.searchEvent, "emit");

    service.setSearchParam(search);
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(service.getSearchParam()).toEqual(search);
  });
});
