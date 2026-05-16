import { Component, signal } from '@angular/core';
import { form, FormRoot } from '@angular/forms/signals';
import { AccountForm } from './account-form';
import { Account, accountSchema, createAccountModel } from '../form.model';

export interface Profile {
  account: Account;
}

@Component({
  selector: 'app-profile-form',
  imports: [AccountForm, FormRoot],
  template: `
    <p>
      <a
        href="https://github.com/brianmtreese/signal-forms-composition-example-after"
        target="_blank"
        >Example and the error summary component sourced from Brian Treese</a
      >
    </p>

    <form [formRoot]="form">
      <app-account-form [form]="form.account" />
    </form>
  `,
})
export class ProfileForm {
  readonly model = signal<Profile>({
    account: createAccountModel(),
  });

  readonly form = form(this.model, (p) => {
    accountSchema(p.account);
  });
}
