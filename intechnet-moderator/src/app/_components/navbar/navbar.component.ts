import { Component, OnInit } from '@angular/core';
import { RouteName } from 'src/app/routing/route-names';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public boardLinkRoute = `/${RouteName.BOARD}`;

  public contactLinkRoute = `/${RouteName.CONTACT}`;

  public homepageLinkRoute = `/${RouteName.HOMEPAGE}`;

  public loginLinkRoute = `/${RouteName.LOGIN}`;

  public registerLinkRoute = `/${RouteName.REGISTER}`;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  goHome(): void {
    this.authenticationService.isModeratorLoggedIn
      ? this.router.navigate([`/${RouteName.BOARD}`])
      : this.router.navigate([`/${RouteName.HOMEPAGE}`]);
  }

  disconnect(): void {
    this.authenticationService.logout();
    this.router.navigate([`/${RouteName.HOMEPAGE}`]);
  }

}
