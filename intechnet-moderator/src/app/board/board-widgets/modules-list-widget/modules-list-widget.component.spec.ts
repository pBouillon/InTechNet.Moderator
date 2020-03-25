import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulesListWidgetComponent } from './modules-list-widget.component';

describe('ModulesListWidgetComponent', () => {
  let component: ModulesListWidgetComponent;
  let fixture: ComponentFixture<ModulesListWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulesListWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulesListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
