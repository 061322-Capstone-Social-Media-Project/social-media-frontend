import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowerCardComponent } from './follower-card.component';

describe('FollowerCardComponent', () => {
  let component: FollowerCardComponent;
  let fixture: ComponentFixture<FollowerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowerCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
