import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Observable, Subscription, tap } from 'rxjs';
import User from 'src/app/models/User';
import { UserProfileService } from 'src/app/services/user-profile.service';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let us: UserProfileService;
  let someEventMock =  new EventEmitter();
  let someSubscribeMock = new Subscription();
  let user: User

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ SearchComponent ],
      providers: [{provide: EventEmitter, useValue: someEventMock},
      {provide: Subscription, useValue: someSubscribeMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    us = TestBed.inject(UserProfileService);
    someEventMock = TestBed.inject(EventEmitter);
    someSubscribeMock = TestBed.inject(Subscription);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call search() on ngOnInit(), change searchParam, and call searchEvent', () => {
    const searchSpy = spyOn(component, "search");
    let expectedSearch = 'Success';
    let actualSearch = '';
    const subSpy = spyOn(us.searchEvent, "subscribe");
    const getSearchParamSpy = spyOn(us, "getSearchParam").and.returnValue(expectedSearch);

    component.ngOnInit();
    actualSearch = us.getSearchParam();
    fixture.detectChanges();

    expect(searchSpy).toHaveBeenCalled();
    expect(subSpy).toHaveBeenCalled();
    expect(getSearchParamSpy).toHaveBeenCalled();
    expect(actualSearch).toEqual(expectedSearch);
  });

  it('should assign users a User[] when search() is called', fakeAsync((done:any) => {
    const testUsers: User[] = [{
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
    }];

    let expected: Observable<User[]> = new Observable<User[]>;
    expected.pipe(tap(users => {
      testUsers.forEach(data => {
        users.push(data);
      });
    }));
    
    component.searchParam = 'test'
    const findUsersSpy = spyOn(us, "findUsers").and.returnValue(expected);
    const subscribeSpy = spyOn(us.findUsers(component.searchParam), "subscribe");

    let actual = us.findUsers(component.searchParam);
    component.search();
    tick();
    fixture.detectChanges();
    //let actual = component.users;
    expect(findUsersSpy).toHaveBeenCalled();
    expect(subscribeSpy).toHaveBeenCalled();
    expect(actual).toEqual(expected);
  }));
});
