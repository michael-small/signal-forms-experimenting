import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { ValidationErrors } from '../validation-errors';
import { Account } from '../form.model';

@Component({
  selector: 'app-account-form-input-tree',
  imports: [FormField, ValidationErrors],
  template: `
    @let form = this.form();

    <h2>Account Information</h2>
    <label>
      First Name:
      <input type="text" [formField]="form.firstName" />
      <app-validation-errors [fieldState]="form.firstName()" />
    </label>
    <label>
      Last Name:
      <input type="text" [formField]="form.lastName" />
      <app-validation-errors [fieldState]="form.lastName()" />
    </label>
  `,
  styles: `
    label {
      display: flex;
    }
  `,
})
export class AccountFormInputTree {
  readonly form = input.required<FieldTree<Account>>();
}
