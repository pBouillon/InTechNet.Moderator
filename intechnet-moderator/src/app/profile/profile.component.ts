import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as feather from 'feather-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  constructor() { }
  
  ngAfterViewInit(): void {
    this.useFeatherIcons();
  }

  ngOnInit(): void {
  }

  /**
   * @summary Replace the feather icons tag by svg source
   */
  private useFeatherIcons(): void {
    feather.replace();
  }

}
