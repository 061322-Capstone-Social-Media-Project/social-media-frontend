import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationViewAllComponent } from './notification-view-all.component';

describe('NotificationViewAllComponent', () => {
  let component: NotificationViewAllComponent;
  let fixture: ComponentFixture<NotificationViewAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationViewAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
