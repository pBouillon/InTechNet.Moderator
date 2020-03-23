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
  @Output()
  hubDeletionEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private hubService: HubService,
    private toastr: ToastrService,
  ) { }

  ngAfterViewInit(): void {
    this.useFeatherIcons();
  }

  ngOnInit(): void { }

  /**
   * @summary copy the hub's shareable link to the user's clipboard
   */
  onCopyShareableLink(): void {
    // Create temporary component holding the text to be copied
    const tempTextBox = document.createElement('textarea');
    tempTextBox.style.position = 'fixed';
    tempTextBox.style.left = '0';
    tempTextBox.style.top = '0';
    tempTextBox.style.opacity = '0';

    // Put the shareable link in the text box
    tempTextBox.value = this.hubService
      .getShareableLinkFor(this.lightweightHub);

    // Add the text box to the DOM
    document.body.appendChild(tempTextBox);

    // Focus and copy the content of the text box
    tempTextBox.focus();
    tempTextBox.select();
    document.execCommand('copy');

    // Clean DOM by removing the component
    document.body.removeChild(tempTextBox);

    // Notify the user
    this.toastr.info('Lien de partage copié !');
  }

  /**
   * @summary delete the current hub
   */
  onDeleteRequest(): void {
    this.hubDeletionEvent.emit(this.lightweightHub.id);
  }

  /**
   * @summary Replace the feather icons tag by svg source
   */
  private useFeatherIcons(): void {
    feather.replace();
  }

}
