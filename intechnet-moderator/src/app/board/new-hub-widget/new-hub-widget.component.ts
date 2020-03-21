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

  private useFeatherIcons(): void {
    feather.replace();
  }

  public onNewHub(): void { }

}
