import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Pupil } from 'src/app/_models/entities/pupil/pupil';

import * as feather from 'feather-icons';

@Component({
  selector: 'app-attendee-row-widget',
  templateUrl: './attendee-row-widget.component.html',
  styleUrls: ['./attendee-row-widget.component.scss']
})
export class AttendeeRowWidgetComponent implements OnInit, AfterViewInit {

  /**
   * @summary data of the pupil to display
   */
  @Input()
  public pupil: Pupil;

  /**
   * @summary toggle the darker display of the row
   */
  @Input()
  public isDarker: boolean;

  constructor() { }

  ngAfterViewInit(): void {
    this.useFeatherIcons();
  }

  ngOnInit(): void { }

  /**
   * @summary Replace the feather icons tag by svg source
   */
  private useFeatherIcons(): void {
    feather.replace();
  }
}
