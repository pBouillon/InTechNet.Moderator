import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHubComponent } from './new-hub.component';

describe('NewHubComponent', () => {
  let component: NewHubComponent;
  let fixture: ComponentFixture<NewHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
