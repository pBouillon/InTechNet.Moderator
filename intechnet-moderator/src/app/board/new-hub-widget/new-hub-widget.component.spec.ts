import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHubWidgetComponent } from './new-hub-widget.component';

describe('NewHubWidgetComponent', () => {
  let component: NewHubWidgetComponent;
  let fixture: ComponentFixture<NewHubWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHubWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHubWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
