import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ImageWidgetComponent } from './image-widget/image-widget.component';
import { ContactComponent } from './contact/contact.component';
import { HowDoesItWorksComponent } from './how-does-it-works/how-does-it-works.component';

@NgModule({
  declarations: [
    HomepageComponent,
    ImageWidgetComponent,
    ContactComponent,
    HowDoesItWorksComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class GlobalModule { }
