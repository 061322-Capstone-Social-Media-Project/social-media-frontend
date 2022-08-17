import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { PostFeedPageComponent } from './post-feed-page.component';

describe('PostFeedPageComponent', () => {
  let component: PostFeedPageComponent;
  let fixture: ComponentFixture<PostFeedPageComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostFeedPageComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();


    
    fixture = TestBed.createComponent(PostFeedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
