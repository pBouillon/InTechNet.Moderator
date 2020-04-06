import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { HubWidgetComponent } from '../hub/hub-widget/hub-widget.component';
import { NewHubComponent } from '../hub/new-hub/new-hub.component';
import { RouterModule } from '@angular/router';
import { HubDetailsComponent } from '../hub/hub-details/hub-details.component';
import { AttendeesListWidgetComponent } from '../hub/hub-details-widgets/attendees-list-widget/attendees-list-widget.component';
import { ModulesListWidgetComponent } from '../hub/hub-details-widgets/modules-list-widget/modules-list-widget.component';
import { HubSettingsWidgetComponent } from '../hub/hub-details-widgets/hub-settings-widget/hub-settings-widget.component';
import { AttendeeRowWidgetComponent } from '../hub/hub-details-widgets/attendee-row-widget/attendee-row-widget.component';

@NgModule({
  declarations: [
    BoardComponent,
    HubWidgetComponent,
    HubDetailsComponent,
    AttendeesListWidgetComponent,
    ModulesListWidgetComponent,
    HubSettingsWidgetComponent,
    AttendeeRowWidgetComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class BoardModule { }
