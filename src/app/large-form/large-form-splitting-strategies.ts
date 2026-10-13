import { Component } from '@angular/core';
import { ProfileFormInputTree } from './input-tree/profile-form';
import { ProfileFormInputModel } from './input-model/profile-form';
import { ProfileFormService } from './service/profile-form';
import { ProfileFormFormValueControl } from './form-value-control/profile-form';

@Component({
  selector: 'app-large-form-splitting-strategies',
  imports: [
    ProfileFormInputTree,
    ProfileFormInputModel,
    ProfileFormService,
    ProfileFormFormValueControl,
  ],
  template: `
    <h2>Large Form splitting strategies</h2>

    <p>
      <a
        href="https://github.com/brianmtreese/signal-forms-composition-example-after"
        target="_blank"
        >Example and the error summary component sourced from Brian Treese</a
      >
    </p>

    <h3>Input Tree</h3>
    <app-profile-form-input-tree />

    <h3>Input Model</h3>
    <app-profile-form-input-model />

    <h3>Service</h3>
    <app-profile-form-service />

    <h3>FormValueControl</h3>
    <app-profile-form-form-value-control />
  `,
})
export class LargeFormSplittingStrategies {}
