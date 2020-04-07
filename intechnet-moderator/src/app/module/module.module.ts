import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleCardWrapperComponent } from './module-card-wrapper/module-card-wrapper.component';

@NgModule({
  declarations: [
    ModuleCardWrapperComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModuleCardWrapperComponent,
  ]
})
export class ModuleModule { }
