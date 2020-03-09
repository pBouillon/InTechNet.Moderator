import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ImageWidgetComponent } from './image-widget/image-widget.component';

@NgModule({
  declarations: [
    HomepageComponent,
    ImageWidgetComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class GlobalModule { }
