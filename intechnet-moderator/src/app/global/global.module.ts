import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ImageWidgetComponent } from './image-widget/image-widget.component';
import { NavbarComponent } from './navbar/navbar.component';

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
