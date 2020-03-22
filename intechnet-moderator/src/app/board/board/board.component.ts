import { Component, AfterViewInit, OnInit } from '@angular/core';
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
export class BoardComponent implements AfterViewInit, OnInit {

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
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngAfterViewInit(): void {
    this.useFeatherIcons();
  }

  ngOnInit(): void {
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
   * @summary Replace the feather icons tag by svg source
   */
  private useFeatherIcons(): void {
    feather.replace();
  }

}
