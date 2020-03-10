import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteName } from './routing/route-names';

import { HomepageComponent } from './global/homepage/homepage.component';
import { HowItWorksComponent } from './global/how-it-works/how-it-works.component';
import { ContactComponent } from './global/contact/contact.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';

const routes: Routes = [
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
