import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../_services/authentication/authentication.service';
import { RouteName } from '../../routing/route-names';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  /**
   * Default constructor
   * @param authenticationService authentication service
   * @param router angular router
   */
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  /**
   * Evaluate if the user is allowed to reach this route
   * @param next route to handle
   * @param state route state
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
  : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // If the user is logged in, allow him to reach its destination
    if (this.authenticationService.isModeratorLoggedIn) {
      return true;
    }

    // If the user is not logged in, redirect it to the login page
    // with its return URL
    this.router.navigate([`/${RouteName.LOGIN}`], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
