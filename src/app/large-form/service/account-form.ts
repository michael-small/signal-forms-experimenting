import { Component, inject, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { ValidationErrors } from '../validation-errors';
import { Account } from '../form.model';
import { FormService } from './form-service';

@Component({
  selector: 'app-account-form-service',
  imports: [FormField, ValidationErrors],
  template: `
    <h2>Account Information</h2>
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
