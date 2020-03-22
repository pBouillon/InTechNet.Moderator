import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
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

  constructor(
    private hubService: HubService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngAfterViewInit(): void {
    this.useFeatherIcons();
  }

  ngOnInit(): void {
    this.deletionModalName = `deletion-modale-${this.lightweightHub.id}`;
  }

  /**
   * @summary delete the current hub
   */
  deleteHub(): void {
    this.hubService
      .deleteHub(this.lightweightHub.id)
      .subscribe(
        (response) => {
          location.reload();
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(
            'Une erreur est survenue lors de la suppression du hub',
            'Erreur lors de la suppression');
        });
  }

  /**
   * @summary Replace the feather icons tag by svg source
   */
  private useFeatherIcons(): void {
    feather.replace();
  }

}
