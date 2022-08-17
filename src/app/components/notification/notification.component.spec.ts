import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Notify } from 'src/app/models/notification';
import { notificationType } from 'src/app/models/notificationType';
import { NotificationService } from 'src/app/services/notification.service';

import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    const notificationServiceSpyObj = jasmine.createSpyObj('LikesService', ['setLikes']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ NotificationComponent ],
      providers: [{provide: NotificationService, useValue: notificationServiceSpyObj}],

    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    const notificationServiceSpyObj = TestBed.get(NotificationService);
    const notificationServiceSpy = notificationServiceSpyObj.setLikes as jasmine.Spy;
    component.ngOnInit();
    expect(notificationServiceSpy).toHaveBeenCalled();
  });

  it('should calll unreadNotifications', () => {
    const notificationServiceSpyObj = TestBed.get(NotificationService);
    const notificationServiceSpy = notificationServiceSpyObj.unreadNotifications as jasmine.Spy;
    component.unreadNotifications();
    expect(notificationServiceSpy).toHaveBeenCalled();
  });

  it('should call dismissNotification', () => {
    const notificationServiceSpyObj = TestBed.get(NotificationService);
    const notificationServiceSpy = notificationServiceSpyObj.dismissNotification as jasmine.Spy;
    const tify = new Notify(1, 'a', 1, notificationType.FOLLOWER, '0', 'HIDDEN'  );
    component.dismissNotification(tify);
    expect(component.dismissNotification).toHaveBeenCalled();
  });

  it('should call readNotification', () => {
    const notificationServiceSpyObj = TestBed.get(NotificationService);
    const notificationServiceSpy = notificationServiceSpyObj.readNotification as jasmine.Spy;
    const tify = new Notify(1, 'a', 1, notificationType.FOLLOWER, '0', 'HIDDEN'  );
    component.readNotification(tify);
    expect(component.readNotification).toHaveBeenCalled();
  } );

  it('should call readAll', () => {
    const notificationServiceSpyObj = TestBed.get(NotificationService);
    const notificationServiceSpy = notificationServiceSpyObj.readAll as jasmine.Spy;
    component.readAll();
    expect(component.readAll).toHaveBeenCalled();
  });

  it('should call dismissAll', () => {
    const notificationServiceSpyObj = TestBed.get(NotificationService);
    const notificationServiceSpy = notificationServiceSpyObj.dismissAll as jasmine.Spy;
    component.dismissAll();
    expect(component.dismissAll).toHaveBeenCalled();
  } );

});
