import { Service, signal } from '@angular/core';
import { Account, accountSchema, createAccountModel } from '../form.model';
import { form } from '@angular/forms/signals';

export interface Profile {
  account: Account;
}

@Service()
export class FormService {
  private readonly model = signal<Profile>({
    account: createAccountModel(),
  });

  readonly form = form(this.model, (p) => {
    accountSchema(p.account);
  });
}
