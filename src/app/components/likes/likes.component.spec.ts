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

    let likesServiceSpy = TestBed.get(LikesService);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikesComponent);
    component = fixture.componentInstance;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
