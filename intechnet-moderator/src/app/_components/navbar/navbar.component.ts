import { Component, OnInit } from '@angular/core';
import { RouteName } from 'src/app/routing/route-names';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public contactLinkRoute = `/${RouteName.CONTACT}`;

  public homepageLinkRoute = `/${RouteName.HOMEPAGE}`;

  public howItWorksLinkRoute = `/${RouteName.HOW_IT_WORKS}`;

  public loginLinkRoute = `/${RouteName.LOGIN}`;

  public registerLinkRoute = `/${RouteName.REGISTER}`;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  disconnect(): void {
    this.authenticationService.logout();
    this.router.navigate([`/${RouteName.HOMEPAGE}`]);
  }

}
