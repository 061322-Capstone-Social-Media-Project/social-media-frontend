import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { FollowerService } from 'src/app/services/follower.service';
import { environment } from 'src/environments/environment';

import { FollowersComponent } from './followers.component';

describe('FollowersComponent', () => {
  let component: FollowersComponent;
  let fixture: ComponentFixture<FollowersComponent>;
  let followerService: FollowerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ FollowersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    followerService = TestBed.inject(FollowerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Will need to test that removeFollowing is being called.
  it('Should get message from child and call removeFollowing', () => {
    let expectedId: number = 1;
    let actualId: number = 0;
    
    //need this observable to so removeFollowing will return a value to subscribers.
    let testUserObserve = new Observable<any>;
    const removeFollowingSpy = spyOn(followerService, 'removeFollowing').and.returnValue(testUserObserve);
    const subSpy = spyOn(followerService.removeFollowing(expectedId), 'subscribe');

    component.getMsgFromChild(expectedId);
    followerService.removeFollowing(expectedId);

    actualId = component.unFollowUserId;

    expect(removeFollowingSpy).toHaveBeenCalled();
    expect(subSpy).toHaveBeenCalled();
    expect(actualId).toEqual(expectedId);
  });
  
  it('Should increase the list of followers by 10 when going to next page', () => {
    let expectedOffset: number = 20;
    let expectedPageNumber: number = 2;
    let actualPageNumber: number;
    let actualOffset: number;

    component.offsetBy = 10;
    component.pageNumber = 1;

    spyOn(component, 'getNext').and.callThrough()
    component.getNext();
    actualPageNumber = component.pageNumber;
    actualOffset = component.offsetBy;
    expect(actualOffset).toEqual(expectedOffset);
    expect(actualPageNumber).toEqual(expectedPageNumber);
  });

  it('Should decrease the list of followers by 10 when going to the previous page', () => {
    let expectedOffset: number = 10;
    let expectedPageNumber: number = 1;
    let actualPageNumber: number;
    let actualOffset: number;

    component.pageNumber = 2;
    component.offsetBy = 20;

    spyOn(component, 'getPrev').and.callThrough();
    component.getPrev();
    actualOffset = component.offsetBy;
    actualPageNumber = component.pageNumber;
    expect(actualOffset).toEqual(expectedOffset);
    expect(actualPageNumber).toEqual(expectedPageNumber);
  });

  it('Should return first if statement in getNext when offsetBy == 10', () => {
    component.offsetBy = 0;

    //we can use the components view and user.id, as they will not change.
    let expectedPrev = `${environment.baseUrl}/${component.view}/user/${component.user.id}?limit=10`;

    spyOn(component, 'getNext').and.callThrough();
    component.getNext();
    expect(component.prev).toEqual(expectedPrev);
  });
  
  it('Should return first if statement in getPrev when offsetBy != 0 and offset == 10', () => {
    component.offsetBy = 20;

    //we can use the components view and user.id, as they will not change.
    let expectedNext = `${environment.baseUrl}/${component.view}/user/${component.user.id}?limit=10`;

    spyOn(component, 'getPrev').and.callThrough();
    component.getPrev();
    expect(component.prev).toEqual(expectedNext);
  })

  it('Should return else if statement in getPrev when offsetBy != 0 and offset >= 10', () => {
    component.offsetBy = 30;

    //we can use the components view and user.id, as they will not change.
    //We subtract 10 from the offset in the url since that will happen in the method
    let expectedNext = `${environment.baseUrl}/${component.view}/user/${component.user.id}?offset=${component.offsetBy -10}&limit=10`;

    spyOn(component, 'getPrev').and.callThrough();
    component.getPrev();
    expect(component.prev).toEqual(expectedNext);
  })

  it('Should toggle to followers when view is on following and vice versa', () => {

    //this first code block will check if the view will change from 'following' to 'followers'.
    component.view = 'following';
    let expectedFollowersView = 'followers';

    component.toggle();
    let actualFollowersView = component.view;
    expect(actualFollowersView).toEqual(expectedFollowersView);

    //this code block will check if the view will change from 'followers' to 'following'.
    let expectedFollowingView = 'following';
    component.toggle();
    let actualFollowingView = component.view;
    expect(actualFollowingView).toEqual(expectedFollowingView);
  });
});
