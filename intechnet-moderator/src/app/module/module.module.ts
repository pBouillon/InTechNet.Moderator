import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleCardComponent } from './module-card/module-card.component';
import { ModuleCardWrapperComponent } from './module-card-wrapper/module-card-wrapper.component';

@NgModule({
  declarations: [
    ModuleCardComponent,
    ModuleCardWrapperComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModuleCardComponent,
    ModuleCardWrapperComponent,
  ]
})
export class ModuleModule { }
