import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { FollowersComponent } from './followers.component';

describe('FollowersComponent', () => {
  let component: FollowersComponent;
  let fixture: ComponentFixture<FollowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get message from child', () => {
    let expectedId: number = 1;
    let actualId: number = 0;
    spyOn(component, 'getMsgFromChild').and.callThrough();
    component.getMsgFromChild(expectedId);

    actualId = component.unFollowUserId;
    expect(actualId).toEqual(expectedId);
  });
  
  it('Should increase the list of followers by 10 when going to next page', () => {
    let expectedOffset: number = 20;
    let expectedPageNumber: number = 2;
    let actualPageNumber: number = 1;
    let actualOffset: number = 10;

    //callFake here since we don't want to test the api call, just if the offset is increased.
    //Also, the offsets and pagenumbers are written almost the exact same way as in the actual function.
    spyOn(component, 'getNext').and.callFake(function(){
      actualOffset = actualOffset + 10;
      actualPageNumber = actualPageNumber + 1;
    });
    component.getNext();
    expect(actualOffset).toEqual(expectedOffset);
    expect(actualPageNumber).toEqual(expectedPageNumber);
  });

  it('Should decrease the list of followers by 10 when going to the previous page', () => {
    let expectedOffset: number = 10;
    let expectedPageNumber: number = 1;
    let actualPageNumber: number = 2;
    let actualOffset: number = 20;

    //callFake here since we don't want to test the api call, just if the offset is decreased.
    //Also, the offsets and pagenumbers are written almost the exact same way as in the actual function.
    spyOn(component, 'getPrev').and.callFake(function(){
      actualOffset = actualOffset - 10;
      actualPageNumber = actualPageNumber - 1;
    });
    component.getPrev();
    expect(actualOffset).toEqual(expectedOffset);
    expect(actualPageNumber).toEqual(expectedPageNumber);
  });

  it('Should return first if statement in getNext when offsetBy == 10', () => {
    component.offsetBy = 0;
    let expectedPrev = `${environment.baseUrl}/followers?limit=10`;

    spyOn(component, 'getNext').and.callThrough();
    component.getNext();
    expect(component.prev).toEqual(expectedPrev);
  });
  
  it('Should return first if statement in getPrev when offsetBy != 0 and offset == 10', () => {
    component.offsetBy = 20;
    let expectedNext = `${environment.baseUrl}/followers?limit=10`;

    spyOn(component, 'getPrev').and.callThrough();
    component.getPrev();
    expect(component.prev).toEqual(expectedNext);
  })

  it('Should not return first if statement in getPrev when offsetBy != 0 and offset >= 10', () => {
    component.offsetBy = 30;
    let expectedNext = `${environment.baseUrl}/followers?offset=20&limit=10`;

    spyOn(component, 'getPrev').and.callThrough();
    component.getPrev();
    expect(component.prev).toEqual(expectedNext);
  })


});
