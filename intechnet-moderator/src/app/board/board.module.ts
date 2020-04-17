import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { HubWidgetComponent } from './hub-widget/hub-widget.component';
import { HubDetailsComponent } from './hub-details/hub-details.component';
import { AttendeesListWidgetComponent } from './board-widgets/attendees-list-widget/attendees-list-widget.component';
import { HubSettingsWidgetComponent } from './board-widgets/hub-settings-widget/hub-settings-widget.component';
import { AttendeeRowWidgetComponent } from './board-widgets/attendee-row-widget/attendee-row-widget.component';
import { ModuleModule } from '../module/module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BoardComponent,
    HubWidgetComponent,
    HubDetailsComponent,
    AttendeesListWidgetComponent,
    HubSettingsWidgetComponent,
    AttendeeRowWidgetComponent,
  ],
  imports: [
    CommonModule,
    ModuleModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BoardModule { }
