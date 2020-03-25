import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeRowWidgetComponent } from './attendee-row-widget.component';

describe('AttendeeRowWidgetComponent', () => {
  let component: AttendeeRowWidgetComponent;
  let fixture: ComponentFixture<AttendeeRowWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendeeRowWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeeRowWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
