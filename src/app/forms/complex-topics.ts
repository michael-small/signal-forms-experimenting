import { Component } from '@angular/core';
import { SplittingStrategies } from './splitting-strategies/splitting-strategies';
import { PasswordRequirements } from './password-requirements/password-requirements';
import { ConditionalReset } from './conditional-reset-fields/conditional-reset';
import { StaticOverDynamicFormModels } from './static-over-dynamic-form-models/static-over-dynamic-form-models';
import { MatTabsModule } from '@angular/material/tabs';
import { FullCRUD } from './full-crud/full-crud';

@Component({
  selector: 'app-complex-topics',
  imports: [
    SplittingStrategies,
    PasswordRequirements,
    ConditionalReset,
    StaticOverDynamicFormModels,
    FullCRUD,
    MatTabsModule,
  ],
  template: `
    <mat-tab-group mat-stretch-tabs="false" mat-align-tabs="start" animationDuration="0ms">
      <mat-tab label="Validation Combinations Exercise">
        <app-password-requirements />
      </mat-tab>
      <mat-tab label="Conditional Reset Fields">
        <app-conditional-reset />
      </mat-tab>
      <mat-tab label="Splitting Up Forms">
        <app-splitting-strategies />
      </mat-tab>
      <mat-tab label="Prefer Static Over Dynamic Form Models">
        <app-static-over-dynamic-form-models />
      </mat-tab>
      <mat-tab label="Full CRUD Example">
        <app-full-crud />
      </mat-tab>
    </mat-tab-group>
  `,
})
export class ComplexTopics {}
