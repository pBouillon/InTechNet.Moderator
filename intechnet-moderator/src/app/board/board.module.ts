import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { HubWidgetComponent } from './hub-widget/hub-widget.component';
import { NewHubWidgetComponent } from './new-hub-widget/new-hub-widget.component';

@NgModule({
  declarations: [
    BoardComponent,
    HubWidgetComponent,
    NewHubWidgetComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BoardModule { }
