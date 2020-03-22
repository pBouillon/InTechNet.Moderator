import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { LightweightHub } from 'src/app/_models/entities/hub/lightweight-hub';

import * as feather from 'feather-icons';

@Component({
  selector: 'app-hub-widget',
  templateUrl: './hub-widget.component.html',
  styleUrls: ['./hub-widget.component.scss']
})
export class HubWidgetComponent implements OnInit, AfterViewInit {

  /**
   * @summary Content to display
   */
  @Input()
  public lightweightHub: LightweightHub;

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
