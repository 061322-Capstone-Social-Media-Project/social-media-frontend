import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
});
