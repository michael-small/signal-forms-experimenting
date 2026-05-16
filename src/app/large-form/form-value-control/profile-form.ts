import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { AccountFormFormValueControl } from './account-form';
import { accountSchema, createAccountModel, Profile } from '../form.model';

@Component({
  selector: 'app-profile-form-form-value-control',
  imports: [AccountFormFormValueControl, FormRoot, FormField],
  template: `
    <h2>FormValueControl</h2>
    <form [formRoot]="form">
      <app-account-form-form-value-control [formField]="form.account.firstName" />
    </form>
  `,
})
export class ProfileFormFormValueControl {
  readonly model = signal<Profile>({
    account: createAccountModel(),
  });

  readonly form = form(this.model, (p) => {
    accountSchema(p.account);
  });
}
