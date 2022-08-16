import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


import { NotificationService } from './notification.service';
import { Notify } from '../models/notification';


describe('NotificationService', () => {
  let service: NotificationService;
  let httpTestingController: HttpTestingController;
  let noti: Notify;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationService],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('#getNotifications should make a `GET` request', () => {
  //   // const noti = {
  //   //   id: 1,
  //   //   notificationBody: "test body",
  //   //   userId: 1,
  //   //   type: 'POST',
  //   // };

  //   service.getNotifications(noti.userId).subscribe(resp => {
  //     expect(resp).toEqual(noti);
  //   });
    
  //   const dataAPI = `${service.notificationUrl}/user/${noti.userId}`;
  //   const req = httpTestingController.expectOne(`${dataAPI}`);

  //   expect(req.request.method).toEqual('GET');

  //   req.flush(noti);

  // });


  it('#updateNotification should make a `put` request', () => {
   
    service.updateNotification(noti).subscribe(resp => {
      expect(resp).toBeTruthy;
    });
    
    const dataAPI = `${service.notificationUrl}`;
    const req = httpTestingController.expectOne(`${dataAPI}`);

    expect(req.request.method).toEqual('PUT');


  });

});
