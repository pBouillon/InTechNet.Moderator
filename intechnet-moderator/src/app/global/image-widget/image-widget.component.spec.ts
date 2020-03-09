import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageWidgetComponent } from './image-widget.component';
import { ImageWidgetData } from './image-widget-data';

describe('ImageWidgetComponent', () => {
  let component: ImageWidgetComponent;
  let fixture: ComponentFixture<ImageWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageWidgetComponent);
    component = fixture.componentInstance;
    component.data = new ImageWidgetData('text sample', 'fake/image/path');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
