import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubSettingsWidgetComponent } from './hub-settings-widget.component';

describe('HubSettingsWidgetComponent', () => {
  let component: HubSettingsWidgetComponent;
  let fixture: ComponentFixture<HubSettingsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubSettingsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubSettingsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
