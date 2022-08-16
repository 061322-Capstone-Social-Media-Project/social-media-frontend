import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCardComponent } from './search-card.component';

describe('SearchCardComponent', () => {
  let component: SearchCardComponent;
  let fixture: ComponentFixture<SearchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCardComponent);
    component = fixture.componentInstance;
    component.user = {
      id: 1,
      email: 'tester@gmail.com',
      password: 'secret',
      firstName: 'test',
      lastName: 'user',
      profilePic: 'none',
      username: 'tester',
      professionalURL: 'none',
      location: 'testville',
      namePronunciation: 'test'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a input user', () => {
    expect(component.user).toBeTruthy();
  });
});
