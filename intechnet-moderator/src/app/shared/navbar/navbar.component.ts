import { Component, OnInit } from '@angular/core';
import { RouteName } from 'src/app/routing/route-names';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public contactLinkRoute = `/${RouteName.CONTACT}`;

  public homepageLinkRoute = `/${RouteName.HOMEPAGE}`;

  public howItWorksLinkRoute = `/${RouteName.HOW_IT_WORKS}`;

  public loginLinkRoute = `/${'#'}`;

  public registerLinkRoute = `/${'#'}`;

  constructor() { }

  ngOnInit(): void {}

}
