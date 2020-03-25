import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HubService } from 'src/app/_services/hub/hub.service';
import { Hub } from 'src/app/_models/entities/hub/hub';
import { ToastrService } from 'ngx-toastr';
import { RouteName } from 'src/app/routing/route-names';
import { HttpErrorResponse } from '@angular/common/http';

import * as feather from 'feather-icons';

@Component({
  selector: 'app-hub-details',
  templateUrl: './hub-details.component.html',
  styleUrls: ['./hub-details.component.scss']
})
export class HubDetailsComponent implements OnInit, AfterViewInit {

  /**
   * @summary data of the current hub
   */
  public hub: Hub;

  constructor(
    private hubService: HubService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngAfterViewInit(): void {
    this.useFeatherIcons();
  }

  ngOnInit(): void {
    // Retrieve the ID of the current route
    this.route.paramMap.subscribe(_ => {
      this.hub = new Hub();
      this.hub.id = +_.get('id');

      // Retrieve the current hub's data
      this.retrieveHubData();
    });
  }

  /**
   * @summary redirect the user to the previous page
   */
  public onBack(): void {
    this.router.navigate([RouteName.BOARD]);
  }

  /**
   * @summary Retrieve the details of the current hub
   *          from it's id provided in the route on
   *          init
   */
  private retrieveHubData(): void {
    this.hubService.getHub(this.hub.id)
      .subscribe(
        (hubData: Hub) => {
          this.hub = hubData;
        },
        (error: HttpErrorResponse) => {
          this.router.navigate([RouteName.BOARD]);
          this.toastr.error(
            'Impossible de récupérer les données du hub',
            'Erreur de connexion au serveur'
          );
        },
      );
  }

  /**
   * @summary Replace the feather icons tag by svg source
   */
  private useFeatherIcons(): void {
    feather.replace();
  }

}
