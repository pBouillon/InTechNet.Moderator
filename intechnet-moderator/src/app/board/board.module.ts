import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { HubWidgetComponent } from './hub-widget/hub-widget.component';
import { NewHubComponent } from './new-hub/new-hub.component';
import { RouterModule } from '@angular/router';
import { HubDetailsComponent } from './hub-details/hub-details.component';
import { AttendeesListWidgetComponent } from './board-widgets/attendees-list-widget/attendees-list-widget.component';
import { ModulesListWidgetComponent } from './board-widgets/modules-list-widget/modules-list-widget.component';
import { HubSettingsWidgetComponent } from './board-widgets/hub-settings-widget/hub-settings-widget.component';

@NgModule({
  declarations: [
    BoardComponent,
    HubWidgetComponent,
    HubDetailsComponent,
    AttendeesListWidgetComponent,
    ModulesListWidgetComponent,
    HubSettingsWidgetComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class BoardModule { }
