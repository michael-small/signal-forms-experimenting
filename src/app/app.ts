import { Component } from '@angular/core';
import { FormArrays } from './forms/form-arrays/form-arrays';
import { FormPrimitiveExamples } from './forms/form-primitive-examples/form-primitive-examples';
import { ComplexTopics } from './forms/complex-topics';
import { LargeFormSplittingStrategies } from './large-form/large-form-splitting-strategies';
import { ShowingErrorsConditions } from './forms/showing-errors-conditions/showing-errors-conditions';

@Component({
  selector: 'app-root',
  imports: [
    FormArrays,
    FormPrimitiveExamples,
    ComplexTopics,
    LargeFormSplittingStrategies,
    ShowingErrorsConditions,
  ],
  template: `
    <h1>Signal Forms Playground</h1>

    <p>
      <a href="https://angular.dev/guide/forms/signals/overview" target="_blank">Signal Forms</a>
      documentation
    </p>

    <h2>Form Primitive Examples</h2>
    <app-form-primitive-examples />

    <h2>Form Arrays</h2>
    <app-form-arrays />

    <h2>Showing Errors Conditions</h2>
    <app-showing-errors-conditions />

    <h2>Complex Topics</h2>
    <app-complex-topics />

    <app-large-form-splitting-strategies />
  `,
  styles: `
    #info {
      display: flex;
      gap: 2rem;
    }
  `,
})
export class App {}
