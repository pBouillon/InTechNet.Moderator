import { Component, OnInit } from '@angular/core';
import { RouteName } from 'src/app/routing/route-names';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {}

  toContact() {
    this.router.navigate([RouteName.CONTACT]);
  }

  toHomepage() {
    this.router.navigate([RouteName.HOMEPAGE]);
  }

}
