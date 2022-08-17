import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable, tap } from 'rxjs';
import Hobby from '../models/Hobby';
import { environment } from 'src/environments/environment';

import { HobbyService } from './hobby.service';

describe('HobbyService', () => {
  let service: HobbyService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HobbyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return hobbies in getAllHobbies', () => {
    let id = '1';
    let myHobby = {
      id: 1,
      hobby1: 'test',
      hobby2: 'test',
      hobby3: 'more tests'
    };
    let expected: Observable<Hobby> = new Observable<Hobby>;
    expected.pipe(tap(hobby => {
      hobby = myHobby;
    }));

    spyOn(service, 'getAllHobbies').and.returnValue(expected);
    let actual = service.getAllHobbies(id);
    expect(actual).toEqual(expected);
  });

  it('should call a http get method in getAllHobbies', (done) => {
    let id = '1';
    const url = `${environment.baseUrl}/hobby?id=${id}`;

    service.getAllHobbies(id).subscribe();
    const getAllHobbiesReq = httpTestingController.expectOne(url);
    expect(getAllHobbiesReq.request.method).toBe("GET");
    getAllHobbiesReq.flush({});
    httpTestingController.verify();
    done();
  });

  it('should call a http put method in updateUserHobbies', (done) => {
    let id = 1; 
    let hobby1 = 'test';
    let hobby2 = 'test';
    let hobby3 = 'more tests';
    const url = `${environment.baseUrl}/hobby`;

    service.updateUserHobbies(hobby1,hobby2,hobby3,id);
    const updateUserHobbiesReq = httpTestingController.expectOne(url);
    expect(updateUserHobbiesReq.request.method).toBe('PUT');
    updateUserHobbiesReq.flush({});
    httpTestingController.verify();
    done();
  });

  it('should create a http post method when createHobby is called', (done) => {
    let id = 1; 
    let hobby1 = 'test';
    let hobby2 = 'test';
    let hobby3 = 'more tests';
    const url = `${environment.baseUrl}/hobby`;

    service.createHobby(hobby1,hobby2,hobby3,id);
    const createHobbyReq  = httpTestingController.expectOne(url);
    expect(createHobbyReq.request.method).toBe('POST');
    createHobbyReq.flush({});
    httpTestingController.verify();
    done();
  });
});
