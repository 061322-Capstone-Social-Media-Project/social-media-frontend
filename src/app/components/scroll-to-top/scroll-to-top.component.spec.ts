import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ScrollToTopComponent } from './scroll-to-top.component';

describe('ScrollToTopComponent', () => {
  let component: ScrollToTopComponent;
  let fixture: ComponentFixture<ScrollToTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollToTopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make windowScrolled true when document scrollTop is >100', () => {
    component.windowScrolled = false;
    window.pageYOffset = 101;
    component.onWindowScroll();
    expect(component.windowScrolled).toBeTrue();
  });

  it('should make windowScrolled false when document scrollTop is < 10', () => {
    component.windowScrolled = true;
    window.pageYOffset = 7;
    component.onWindowScroll();
    expect(component.windowScrolled).toBeFalse();

  });

  it('should scroll the page to the top when scrollToTop is called', () => {
    spyOn(window, 'scrollTo');
    document.documentElement.scrollTop = 100;
    component.scrollToTop();
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
