import { Component, OnInit, Output, Input, AfterViewInit, EventEmitter } from '@angular/core';
import { LightweightHub } from 'src/app/_models/entities/hub/lightweight-hub';

import * as feather from 'feather-icons';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HubService } from 'src/app/_services/hub/hub.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RouteName } from 'src/app/routing/route-names';

@Component({
  selector: 'app-hub-widget',
  templateUrl: './hub-widget.component.html',
  styleUrls: ['./hub-widget.component.scss']
})
export class HubWidgetComponent implements OnInit, AfterViewInit {

  deletionModalName: string;

  /**
   * @summary Content to display
   */
  @Input()
  public lightweightHub: LightweightHub;

  /**
   * @summary Emit the id of the hub on user's deletion request
   */
  @Output('hubDeletionEvent')
  idToBeDeletedEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private hubService: HubService,
    private router: Router,
  ) { }

  ngAfterViewInit(): void {
    this.useFeatherIcons();
  }

  ngOnInit(): void { }

  /**
   * @summary delete the current hub
   */
  onDeleteRequest(): void {
    this.idToBeDeletedEvent.emit(this.lightweightHub.id);
  }

  /**
   * @summary Replace the feather icons tag by svg source
   */
  private useFeatherIcons(): void {
    feather.replace();
  }

}
