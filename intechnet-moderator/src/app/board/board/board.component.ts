import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';

import { Moderator } from 'src/app/_models/entities/moderator/moderator';
import { HubService } from 'src/app/_services/hub/hub.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LightweightHub } from 'src/app/_models/entities/hub/lightweight-hub';

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
    this.loadModeratorHubs();
    this.currentModerator = this.authenticationService.currentModerator;
  }

  /**
   * @summary Retrieve lightweight representation of all hubs owned by the
   *          current moderator
   */
  private loadModeratorHubs(): void {
    this.hubService.getHubs()
      .subscribe(
        (data: Array<LightweightHub>) => {
          // Initialize the collection of hubs
          this.moderatorHubs = [];

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

}
