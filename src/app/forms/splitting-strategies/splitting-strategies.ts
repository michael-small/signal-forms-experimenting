import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ParentService } from './service/parent';
import { ParentFieldTreeInputs } from './field-tree/parent';
import { ParentModelInputs } from './model-inputs/parent';

@Component({
  selector: 'app-splitting-strategies',
  imports: [MatTabsModule, ParentService, ParentFieldTreeInputs, ParentModelInputs],
  template: `
    <mat-tab-group mat-stretch-tabs="false" mat-align-tabs="start" animationDuration="0ms">
      <mat-tab label="Service"><app-parent-service /></mat-tab>
      <mat-tab label="Field Tree Inputs"><app-parent-field-tree-inputs /></mat-tab>
      <mat-tab label="Model Inputs"><app-parent-model-inputs /></mat-tab>
    </mat-tab-group>
  `,
})
export class SplittingStrategies {}
