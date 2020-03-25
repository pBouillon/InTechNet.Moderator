import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteName } from './routing/route-names';

import { HomepageComponent } from './homepage/homepage/homepage.component';
import { ContactComponent } from './homepage/contact/contact.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { LoginComponent } from './authentication/login/login.component';
import { BoardComponent } from './board/board/board.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AuthenticationGuard } from './_guards/authentication-guard/authentication.guard';
import { NewHubComponent } from './board/new-hub/new-hub.component';
import { HubLimitGuard } from './_guards/hub-limit-guard/hub-limit-guard.guard';
import { HubDetailsComponent } from './board/hub-details/hub-details.component';

const routes: Routes = [
  // Authentication
  // ----------
  { path: RouteName.LOGIN, component: LoginComponent },
  { path: RouteName.REGISTER, component: RegisterComponent },

  // Board and management
  // ----------
  // Main board
  {
    path: RouteName.BOARD,
    component: BoardComponent,
    canActivate: [ AuthenticationGuard ]
  },
  {
    path: RouteName.HUB_DETAILS,
    component: HubDetailsComponent,
    canActivate: [ AuthenticationGuard ]
  },
  // New hub
  {
    path: RouteName.NEW_HUB,
    component: NewHubComponent,
    canActivate: [ AuthenticationGuard, HubLimitGuard ]
  },

  // Global
  // ----------
  // Contact
  { path: RouteName.CONTACT, component: ContactComponent },
  // Homepage
  { path: RouteName.HOMEPAGE, component: HomepageComponent },
  // Redirect the user to the homepage on '/'
  {
    path: RouteName.ROOT,
    redirectTo: RouteName.HOMEPAGE,
    pathMatch: 'full'
  },
  // 404 error page
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
