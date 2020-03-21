import { Component, OnInit, Input } from '@angular/core';
import { LightweightHub } from 'src/app/_models/entities/hub/lightweight-hub';

@Component({
  selector: 'app-hub-widget',
  templateUrl: './hub-widget.component.html',
  styleUrls: ['./hub-widget.component.scss']
})
export class HubWidgetComponent implements OnInit {

  /**
   * @summary Content to display
   */
  @Input()
  public lightweightHub: LightweightHub;

  constructor() { }

  ngOnInit(): void { }

}
