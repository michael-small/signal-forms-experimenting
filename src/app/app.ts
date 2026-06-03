import { Component } from '@angular/core';
import { Links } from './links';
import { FormArrays } from './forms/form-arrays/form-arrays';
import { FormPrimitiveExamples } from './forms/form-primitive-examples/form-primitive-examples';
import { About } from './about';
import { ComplexTopics } from './forms/complex-topics';
import { LargeFormSplittingStrategies } from './large-form/large-form-splitting-strategies';
import { ShowingErrorsConditions } from './forms/showing-errors-conditions/showing-errors-conditions';

@Component({
  selector: 'app-root',
  imports: [
    Links,
    FormArrays,
    FormPrimitiveExamples,
    About,
    ComplexTopics,
    LargeFormSplittingStrategies,
    ShowingErrorsConditions,
  ],
  template: `
    <h1>Signal Forms</h1>

    <div id="info">
      <div>
        <h2>Links</h2>
        <app-links />
      </div>
      <div>
        <h2>About</h2>
        <app-about />
      </div>
    </div>

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
