import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Pupil } from './node_modules/src/app/_models/entities/pupil/pupil';

import * as feather from './node_modules/feather-icons';

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

  /**
   * @summary Emit the id of user to be kicked
   */
  @Output()
  pupilKickRequestEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngAfterViewInit(): void {
    this.useFeatherIcons();
  }

  ngOnInit(): void { }

  /**
   * @summary on kick request, emit the current pupil's id
   */
  public onKickRequest(): void {
    this.pupilKickRequestEvent.emit(this.pupil.id);
  }

  /**
   * @summary Replace the feather icons tag by svg source
   */
  private useFeatherIcons(): void {
    feather.replace();
  }
}
