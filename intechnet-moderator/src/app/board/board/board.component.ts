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

  /**
   * @summary Holds the data of the hub the user wants to delete
   */
  public toBeDeleted: LightweightHub;

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
   * @summary Perform hub deletion based on the hub `toBeDeleted` data
   */
  public deleteHub(): void {
    this.hubService
      .deleteHub(this.toBeDeleted.id)
      .subscribe(
        (response) => {
          // Update user's view
          var hubElementIndex = this.moderatorHubs.indexOf(this.toBeDeleted);
          if (hubElementIndex != -1) {
              this.moderatorHubs.splice(hubElementIndex, 1);
          }

          // Display confirmation message
          this.toastr.success(
            'Votre hub a bien été supprimé',
            'Hub supprimé');

          // Close modal
          document.getElementById('closeHubDeletionModal').click();
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(
            'Une erreur est survenue lors de la suppression du hub',
            'Erreur lors de la suppression');
        });
  }

  /**
   * @summary Ask for the user to confirm the deletion of one of its hubs
   */
  public deleteHubRequest(event): void {
    // Retrieve the hub id
    const hubId = event as number;

    // Fetch the associated hub
    this.toBeDeleted = null;
    this.moderatorHubs.forEach(hub => {
      if (hub.id == hubId) {
        this.toBeDeleted = hub;
      }
    });

    // Display confirmation
    this.toBeDeleted === null
      ? this.toastr.error(
        'Impossible de supprimer ce hub',
        'Une erreur est survenue')
      : document.getElementById('openHubDeletionModal').click();
  }

  /**
   * @summary Retrieve lightweight representation of all hubs owned by the
   *          current moderator
   */
  private loadModeratorHubs(): void {
    // Initialize the collection of hubs
    this.moderatorHubs = [];

    // Initialize modal lightweight hub buffer
    this.toBeDeleted = new LightweightHub();

    // retrieve user's hubs
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
