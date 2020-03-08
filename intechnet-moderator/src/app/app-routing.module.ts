import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteName } from './routing/route-names';

import { HomepageComponent } from './global/homepage/homepage.component';

const routes: Routes = [
  // Homepage
  { path: RouteName.HOMEPAGE, component: HomepageComponent },
  // Redirect the user to the homepage on '/'
  {
    path: RouteName.ROOT,
    redirectTo: RouteName.HOMEPAGE,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
