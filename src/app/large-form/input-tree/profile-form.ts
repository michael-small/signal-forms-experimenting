import { Component, signal } from '@angular/core';
import { form, FormRoot } from '@angular/forms/signals';
import { AccountFormInputTree } from './account-form';
import { accountSchema, createAccountModel, Profile } from '../form.model';

@Component({
  selector: 'app-profile-form-input-tree',
  imports: [AccountFormInputTree, FormRoot],
  template: `
    <h2>Input Tree</h2>
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
