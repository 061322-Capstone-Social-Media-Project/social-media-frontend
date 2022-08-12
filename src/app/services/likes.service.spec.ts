import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { LikesService } from './likes.service';

describe('LikesService', () => {
  let service: LikesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LikesService],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(LikesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getLike should make a `GET` request', () => {
    const likes = {
      id: 1,
      userId: 1,
      postId: 1,
    };

    service.getLike(1,1).subscribe(resp => {
      expect(resp).toEqual(likes);
    });
    
    const dataAPI = `${service.likesUrl}/user/${likes.userId}/post/${likes.postId}`;
    const req = httpTestingController.expectOne(`${dataAPI}`);

    expect(req.request.method).toEqual('GET');

    req.flush(likes);

  });

  it('#postLike should make a `POST` request', () => {
    const likes = {
      id: 1,
      userId: 1,
      postId: 1,
    };

    service.postLike(likes).subscribe(resp => {
      expect(resp).toBeTruthy;
    });
    
    const dataAPI = `${service.likesUrl}`;
    const req = httpTestingController.expectOne(`${dataAPI}`);

    expect(req.request.method).toEqual('POST');

    req.flush(likes);

  });

  it('#deleteLike should make a `DELETE` request', () => {
    const likes = {
      id: 1,
      userId: 1,
      postId: 1,
    };

    service.removeLike(likes.id).subscribe(resp => {
      expect(resp).toBeTruthy;
    });
    
    const dataAPI = `${service.likesUrl}/${likes.id}`;
    const req = httpTestingController.expectOne(`${dataAPI}`);

    expect(req.request.method).toEqual('DELETE');

    req.flush(likes);

  });
  

});
