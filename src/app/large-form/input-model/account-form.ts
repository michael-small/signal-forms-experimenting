import { Component, model } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { ValidationErrors } from '../validation-errors';

@Component({
  selector: 'app-account-form-input-model',
  imports: [FormField, ValidationErrors],
  template: `
    <h2>Account Information</h2>
    <label>
      First Name:
      <input type="text" [formField]="form" />
      <app-validation-errors [fieldState]="form()" />
    </label>
  `,
  styles: `
    label {
      display: flex;
    }
  `,
})
export class AccountFormInputModel {
  readonly model = model.required<string>();

  readonly form = form(this.model, (p) => {
    required(p, { message: 'First name is required' });
  });
}
