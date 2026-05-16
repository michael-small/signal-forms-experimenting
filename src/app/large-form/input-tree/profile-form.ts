import { Component, signal } from '@angular/core';
import { form, FormRoot } from '@angular/forms/signals';
import { AccountFormInputTree } from './account-form';
import { Account, accountSchema, createAccountModel } from '../form.model';

export interface Profile {
  account: Account;
}

@Component({
  selector: 'app-profile-form-input-tree',
  imports: [AccountFormInputTree, FormRoot],
  template: `
    <form [formRoot]="form">
      <app-account-form-input-tree [form]="form.account" />
    </form>
  `,
})
export class ProfileFormInputTree {
  readonly model = signal<Profile>({
    account: createAccountModel(),
  });

  readonly form = form(this.model, (p) => {
    accountSchema(p.account);
  });
}
