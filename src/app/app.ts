import { Component } from '@angular/core';
import { Links } from './links';
import { BillPay } from './forms/bill-pay';
import { ConditionalReset } from './forms/conditional-reset-fields/conditional-reset';
import { FormArrays } from './forms/form-arrays/form-arrays';
import { FormPrimitiveExamples } from './forms/form-primitive-examples/form-primitive-examples';
import { PasswordRequirements } from './forms/password-requirements/password-requirements';
import { ParentModelInputs } from './forms/splitting-strategies/model-inputs/parent';
import { ParentFieldTreeInputs } from './forms/splitting-strategies/field-tree/parent';
import { ParentService } from './forms/splitting-strategies/service/parent';
import { SplittingStrategies } from './forms/splitting-strategies/splitting-strategies';
import { About } from './about';

@Component({
  selector: 'app-root',
  imports: [
    Links,
    BillPay,
    ConditionalReset,
    FormArrays,
    FormPrimitiveExamples,
    PasswordRequirements,
    SplittingStrategies,
    About,
  ],
  template: `
    <h1>Signal Forms + NgRx + NgRx Toolkit</h1>

    <h2>Links</h2>
    <app-links />

    <h2>About</h2>
    <app-about />

    <h2>Splitting Up Forms</h2>
    <app-splitting-strategies />

    <h2>Password Requirements - Validators Combination Exercise</h2>
    <app-password-requirements />

    <h2>Form Primitive Examples</h2>
    <app-form-primitive-examples />

    <h2>Form Arrays</h2>
    <app-form-arrays />

    <h2>Conditional Reset Fields Form</h2>
    <app-conditional-reset />

    <h2>Bill Pay Form</h2>
    <app-bill-pay />
  `,
})
export class App {}
