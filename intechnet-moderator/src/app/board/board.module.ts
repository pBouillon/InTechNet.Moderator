import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { HubWidgetComponent } from './hub-widget/hub-widget.component';
import { NewHubComponent } from './new-hub/new-hub.component';

@NgModule({
  declarations: [
    BoardComponent,
    HubWidgetComponent,
    NewHubComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class BoardModule { }
