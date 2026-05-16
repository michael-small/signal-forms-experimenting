import { Component, inject } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { ValidationErrors } from '../validation-errors';
import { FormService } from './form-service';

@Component({
  selector: 'app-account-form-service',
  imports: [FormField, ValidationErrors],
  template: `
    <label>
      First Name:
      <input type="text" [formField]="form.firstName" />
      <app-validation-errors [fieldState]="form.firstName()" />
    </label>
  `,
  styles: `
    label {
      display: flex;
    }
  `,
})
export class AccountFormService {
  readonly formService = inject(FormService);

  protected form = this.formService.form.account;
}
