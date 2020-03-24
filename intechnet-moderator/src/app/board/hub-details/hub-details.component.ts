import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hub-details',
  templateUrl: './hub-details.component.html',
  styleUrls: ['./hub-details.component.scss']
})
export class HubDetailsComponent implements OnInit {

  /**
   * @summary id of the hub
   */
  private hubId: number;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // Retrieve the ID of the current route
    this.route.paramMap.subscribe(_ => {
      this.hubId = +_.get('id');
    });

    // Retrieve the current hub's data
    this.retrieveHubData();
  }

  /**
   * @summary Retrieve the details of the current hub
   *          from it's id provided in the route on
   *          init
   */
  private retrieveHubData(): void {

  }

}
