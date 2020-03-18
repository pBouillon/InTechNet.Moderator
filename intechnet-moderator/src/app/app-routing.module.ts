import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteName } from './routing/route-names';

import { HomepageComponent } from './homepage/homepage/homepage.component';
import { HowItWorksComponent } from './homepage/how-it-works/how-it-works.component';
import { ContactComponent } from './homepage/contact/contact.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { LoginComponent } from './authentication/login/login.component';
import { BoardComponent } from './board/board/board.component';
import { AuthenticationGuard } from './_guards/authentication.guard';

const routes: Routes = [
  // Authentication
  // ----------
  { path: RouteName.LOGIN, component: LoginComponent },

  // Board and management
  // ----------
  // Main board
  {
    path: RouteName.BOARD,
    component: BoardComponent,
    canActivate: [ AuthenticationGuard ]
  },

  // Global
  // ----------
  // Contact
  { path: RouteName.CONTACT, component: ContactComponent },
  // Homepage
  { path: RouteName.HOMEPAGE, component: HomepageComponent },
  // 'How it works'
  { path: RouteName.HOW_IT_WORKS, component: HowItWorksComponent },
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
