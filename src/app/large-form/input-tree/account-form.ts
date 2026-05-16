import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { ValidationErrors } from '../validation-errors';
import { Account } from '../form.model';

@Component({
  selector: 'app-account-form-input-tree',
  imports: [FormField, ValidationErrors],
  template: `
    @let form = this.form();

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
export class AccountFormInputTree {
  readonly form = input.required<FieldTree<Account>>();
}
