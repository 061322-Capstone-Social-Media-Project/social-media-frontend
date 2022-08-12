import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

import { FollowerCardComponent } from './follower-card.component';

describe('FollowerCardComponent', () => {
  let component: FollowerCardComponent;
  let fixture: ComponentFixture<FollowerCardComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ FollowerCardComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should emit a user', (done) => {
    const eventSpy = spyOn(component.callParent, "emit");
    component.unfollow();
    expect(eventSpy).toHaveBeenCalled();
  });
});
