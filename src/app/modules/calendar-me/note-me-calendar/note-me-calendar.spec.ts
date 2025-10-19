import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteMeCalendar } from './note-me-calendar';

describe('NoteMeCalendar', () => {
  let component: NoteMeCalendar;
  let fixture: ComponentFixture<NoteMeCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteMeCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteMeCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
