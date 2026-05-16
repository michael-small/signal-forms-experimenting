import { Component, input } from '@angular/core';
import { FieldTree, FormField, required, SchemaPathTree } from '@angular/forms/signals';
import { ValidationErrors } from '../validation-errors';
import { Account } from '../form.model';

@Component({
  selector: 'app-account-form',
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
export class AccountForm {
  readonly form = input.required<FieldTree<Account>>();
}
