import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';

import { Moderator } from 'src/app/_models/entities/moderator/moderator';
import { HubService } from 'src/app/_services/hub/hub.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LightweightHub } from 'src/app/_models/entities/hub/lightweight-hub';

import { ToastrService } from 'ngx-toastr';
import { RouteName } from 'src/app/routing/route-names';
import { Router } from '@angular/router';

import * as feather from 'feather-icons';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements AfterViewInit, OnDestroy, OnInit {

  /**
   * @summary Current moderator representation
   */
  public currentModerator: Moderator;

  /**
   * @summary Collection of all hubs owned by the current moderator
   */
  public moderatorHubs: Array<LightweightHub> = [];

  /**
   * @summary timeout for content refresh
   */
  private refreshTimeout;

  /**
   * @summary delay between each refresh in ms
   */
  private refreshInterval = 3_000;

  constructor(
    private authenticationService: AuthenticationService,
    private hubService: HubService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngAfterViewInit(): void {
    this.useFeatherIcons();
  }

  ngOnInit(): void {
    // Retrieve the current moderator
    this.currentModerator = this.authenticationService.currentModerator;

    // Fetch its hubs
    this.loadModeratorHubs();

    // Activate the refresh timer
    this.refreshTimeout = setInterval(() =>
      this.loadModeratorHubs(),
      this.refreshInterval);
  }

  /**
   * @summary clear refresh timeout
   */
  ngOnDestroy(): void {
    clearInterval(this.refreshTimeout);
  }

  /**
   * @summary Retrieve lightweight representation of all hubs owned by the
   *          current moderator
   */
  private loadModeratorHubs(): void {
    // retrieve user's hubs
    this.hubService.getHubs()
      .subscribe(
        (data: Array<LightweightHub>) =>
          this.moderatorHubs = data,
        (_: HttpErrorResponse) => {
          this.toastr.error(
            'Une erreur est survenue lors de la récupération de vos hubs',
            'Erreur de connexion');
        });
  }

  /**
   * @summary Redirect to the hub creation page
   */
  public onNewHub(): void {
    this.router.navigate([RouteName.NEW_HUB]);
  }

  /**
   * @summary Refresh the moderator hub's data if needed
   */
  public refreshHubs(): void {

  }

  /**
   * @summary Replace the feather icons tag by svg source
   */
  private useFeatherIcons(): void {
    feather.replace();
  }

}
