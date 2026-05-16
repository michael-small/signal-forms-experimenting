import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { AccountFormFormValueControl } from './account-form';
import { Account, accountSchema, createAccountModel } from '../form.model';

export interface Profile {
  account: Account;
}

@Component({
  selector: 'app-profile-form-form-value-control',
  imports: [AccountFormFormValueControl, FormRoot, FormField],
  template: `
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
