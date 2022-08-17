import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikesService } from 'src/app/services/likes.service';

import { LikesComponent } from './likes.component';

describe('LikesComponent', () => {
  let component: LikesComponent;
  let fixture: ComponentFixture<LikesComponent>;
  let dataServiceSpy: jasmine.SpyObj<LikesService>;

  beforeEach(async () => {
    const likesServiceSpyObj = jasmine.createSpyObj('LikesService', ['setLikes']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [LikesComponent],
      providers: [{provide: LikesService, useValue: likesServiceSpyObj}],
    }).compileComponents();


  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikesComponent);
    component = fixture.componentInstance;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setLikes', () => {
    const likesServiceSpyObj = TestBed.get(LikesService);
    const likesServiceSpy = likesServiceSpyObj.setLikes as jasmine.Spy;
    component.setLikes();
    expect(likesServiceSpy).toHaveBeenCalled();
  });

  it('should call likeSwitch', () => {
    const likesServiceSpyObj = TestBed.get(LikesService);
    const likesServiceSpy = likesServiceSpyObj.setLikes as jasmine.Spy;
    component.likeSwitch();
    expect(likesServiceSpy).toHaveBeenCalled();
  });

 


});
