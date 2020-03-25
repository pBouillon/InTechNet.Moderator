import { Component, OnInit, Input } from '@angular/core';
import { Pupil } from 'src/app/_models/entities/pupil/pupil';

@Component({
  selector: 'app-attendees-list-widget',
  templateUrl: './attendees-list-widget.component.html',
  styleUrls: ['./attendees-list-widget.component.scss']
})
export class AttendeesListWidgetComponent implements OnInit {

  /**
   * @summary An array of all pupils attending this hub
   */
  @Input()
  public attendees: Array<Pupil>;

  constructor() { }

  ngOnInit(): void { }

}
