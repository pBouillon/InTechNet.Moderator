import { Component, OnInit } from '@angular/core';

import * as feather from 'feather-icons';

@Component({
  selector: 'app-new-hub-widget',
  templateUrl: './new-hub-widget.component.html',
  styleUrls: ['./new-hub-widget.component.scss']
})
export class NewHubWidgetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.useFeatherIcons();
  }

  /**
   * @summary Replace the feather icons tag by svg source
   */
  private useFeatherIcons(): void {
    feather.replace();
  }

  /**
   * @summary Redirect to the hub creation page
   */
  public onNewHub(): void {
    // TODO on a new issue
  }

}
