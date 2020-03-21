import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubWidgetComponent } from './hub-widget.component';

describe('HubWidgetComponent', () => {
  let component: HubWidgetComponent;
  let fixture: ComponentFixture<HubWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
