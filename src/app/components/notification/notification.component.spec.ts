import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Notify } from 'src/app/models/notification';
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

  it('should call readAll', () => {
    const notificationServiceSpyObj = TestBed.get(NotificationService);
    const notificationServiceSpy = notificationServiceSpyObj.readAll as jasmine.Spy;
    component.readAll();
    expect(notificationServiceSpy).toHaveBeenCalled();
  });

});
