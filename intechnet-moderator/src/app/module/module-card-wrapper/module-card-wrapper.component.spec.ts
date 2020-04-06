import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleCardWrapperComponent } from './module-card-wrapper.component';

describe('ModuleCardWrapperComponent', () => {
  let component: ModuleCardWrapperComponent;
  let fixture: ComponentFixture<ModuleCardWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleCardWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleCardWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
