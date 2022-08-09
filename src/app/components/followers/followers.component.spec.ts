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
    let expectedPrev = `${environment.baseUrl}/followers?limit=10`;

    spyOn(component, 'getNext').and.callThrough();
    component.getNext();
    expect(component.prev).toEqual(expectedPrev);
  });
});
