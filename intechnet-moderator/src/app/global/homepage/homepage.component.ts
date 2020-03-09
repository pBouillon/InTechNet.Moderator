import { Component, OnInit } from '@angular/core';
import { ImageWidgetData } from '../image-widget/image-widget-data';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  /**
   * @summary Presentation widgets contents
   */
  public introSections: Array<ImageWidgetData>;

  constructor() { }

  ngOnInit(): void {
    this._initializeSections();
  }

  /**
   * @summary Initialize presentation widgets contents
   */
  private _initializeSections(): void {
    this.introSections = [
      new ImageWidgetData(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
        '../../../assets/img/working-student.jpg'
      )
    ];
  }

}
