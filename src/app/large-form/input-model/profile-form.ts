import { Component, signal } from '@angular/core';
import { form, FormRoot } from '@angular/forms/signals';
import { Account, accountSchema, createAccountModel } from '../form.model';
import { AccountFormInputModel } from './account-form';

export interface Profile {
  account: Account;
}

@Component({
  selector: 'app-profile-form-input-model',
  imports: [AccountFormInputModel],
  template: `
    <form>
      <app-account-form-input-model [model]="model().account.firstName" />
    </form>
  `,
})
export class ProfileFormInputModel {
  readonly model = signal<Profile>({
    account: createAccountModel(),
  });
}
