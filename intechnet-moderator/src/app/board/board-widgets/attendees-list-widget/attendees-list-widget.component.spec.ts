import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeesListWidgetComponent } from './attendees-list-widget.component';

describe('AttendeesListWidgetComponent', () => {
  let component: AttendeesListWidgetComponent;
  let fixture: ComponentFixture<AttendeesListWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendeesListWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeesListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
