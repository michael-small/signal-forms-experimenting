import { Component } from '@angular/core';
import { ProfileFormInputTree } from './input-tree/profile-form';

@Component({
  selector: 'app-large-form-splitting-strategies',
  imports: [ProfileFormInputTree],
  template: `
    <h1>Large Form splitting strategies</h1>

    <p>
      <a
        href="https://github.com/brianmtreese/signal-forms-composition-example-after"
        target="_blank"
        >Example and the error summary component sourced from Brian Treese</a
      >
    </p>

    <app-profile-form-input-tree />
  `,
})
export class LargeFormSplittingStrategies {}
