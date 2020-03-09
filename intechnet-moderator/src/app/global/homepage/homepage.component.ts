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
        'À travers divers modules et activités, organisez des sessions de sensibilisation ' +
        'et de formation autour des thèmes du numérique.',
        '../../../assets/img/working-student.jpg'
      )
    ];
  }

}
