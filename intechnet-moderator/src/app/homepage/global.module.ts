import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ImageWidgetComponent } from './image-widget/image-widget.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    HomepageComponent,
    ImageWidgetComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class GlobalModule { }
