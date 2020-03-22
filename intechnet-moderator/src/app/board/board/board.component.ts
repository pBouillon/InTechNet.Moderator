import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';

import { Moderator } from 'src/app/_models/entities/moderator/moderator';
import { HubService } from 'src/app/_services/hub/hub.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LightweightHub } from 'src/app/_models/entities/hub/lightweight-hub';

import * as feather from 'feather-icons';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  /**
   * @summary Current moderator representation
   */
  public currentModerator: Moderator;

  /**
   * @summary Collection of all hubs owned by the current moderator
   */
  public moderatorHubs: Array<LightweightHub>;

  constructor(
    private authenticationService: AuthenticationService,
    private hubService: HubService,
  ) { }

  ngOnInit(): void {
    this.useFeatherIcons();

    this.loadModeratorHubs();
    this.currentModerator = this.authenticationService.currentModerator;
  }

  /**
   * @summary Retrieve lightweight representation of all hubs owned by the
   *          current moderator
   */
  private loadModeratorHubs(): void {
    // Initialize the collection of hubs
    this.moderatorHubs = [];

    this.hubService.getHubs()
      .subscribe(
        (data: Array<LightweightHub>) => {
          // Convert each raw hub representation to the LightweightHub object
          // to populate the array
          data.map(raw =>
            this.moderatorHubs.push(new LightweightHub(raw)));
        },
        (error: HttpErrorResponse) => {
          // TODO: toastr ?
          console.log(error);
        });
  }

  /**
   * @summary Redirect to the hub creation page
   */
  public onNewHub(): void {
    // TODO on a new issue
  }

  /**
   * @summary Replace the feather icons tag by svg source
   */
  private useFeatherIcons(): void {
    feather.replace();
  }

}
