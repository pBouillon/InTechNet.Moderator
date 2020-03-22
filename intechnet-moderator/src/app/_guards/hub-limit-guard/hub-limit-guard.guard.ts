import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { HubService } from 'src/app/_services/hub/hub.service';
import { LightweightHub } from 'src/app/_models/entities/hub/lightweight-hub';
import { HttpErrorResponse } from '@angular/common/http';
import { RouteName } from 'src/app/routing/route-names';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HubLimitGuard implements CanActivate {

  /**
   * Default constructor
   * @param authenticationService authentication service
   * @param router angular router
   */
  constructor(
    private authenticationService: AuthenticationService,
    private hubService: HubService,
    private router: Router,
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

    // Fetch the maximum number of allowed hubs
    const maxHubsCount = this.authenticationService
      .currentModerator
      .subscriptionPlanDto
      .maxHubPerModeratorAccount;

    return this.hubService.getHubs()
      .pipe(map(
        (ownedHub: Array<LightweightHub>) => {

          // If the moderator as less hubs than what it is allowed to have
          // authorize it to reach the page
          if (ownedHub.length < maxHubsCount) {
            return true;
          }

          // Otherwise, redirect him to the board page
          this.router.navigate([`/${RouteName.BOARD}`]);
          return false;
        },
        (error: HttpErrorResponse) => {
          // TODO: toastr ?
          console.log(error);
        }));
  }

}
