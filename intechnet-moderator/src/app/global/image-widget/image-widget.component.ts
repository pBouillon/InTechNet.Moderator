import { Component, Input, OnInit } from '@angular/core';
import { ImageWidgetData } from './image-widget-data';

@Component({
  selector: 'app-image-widget',
  templateUrl: './image-widget.component.html',
  styleUrls: ['./image-widget.component.scss']
})
export class ImageWidgetComponent implements OnInit {

  /**
   * @summary Content to display
   */
  @Input()
  public data: ImageWidgetData;

  constructor() { }

  ngOnInit(): void { }

}
