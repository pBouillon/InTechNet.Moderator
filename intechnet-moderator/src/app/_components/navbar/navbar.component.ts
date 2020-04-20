import { Component, OnInit } from '@angular/core';
import { RouteName } from 'src/app/routing/route-names';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public boardLinkRoute = `/${RouteName.BOARD}`;

  public contactLinkRoute = `/${RouteName.CONTACT}`;

  public homepageLinkRoute = `/${RouteName.HOMEPAGE}`;

  public howDoesItWorkLinkRoute = `/${RouteName.HOW_DOES_IT_WORK}`;

  public loginLinkRoute = `/${RouteName.LOGIN}`;

  public profileLinkRoute = `/${RouteName.PROFILE}`;

  public registerLinkRoute = `/${RouteName.REGISTER}`;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {}

  goHome(): void {
    this.authenticationService.isModeratorLoggedIn
      ? this.router.navigate([`/${RouteName.BOARD}`])
      : this.router.navigate([`/${RouteName.HOMEPAGE}`]);
  }

  disconnect(): void {
    // Clear all toasts on disconnection
    this.toastr.clear();

    this.authenticationService.logout();
    this.router.navigate([`/${RouteName.HOMEPAGE}`]);
  }

}
