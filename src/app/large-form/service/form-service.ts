import { Service, signal } from '@angular/core';
import { accountSchema, createAccountModel, Profile } from '../form.model';
import { form } from '@angular/forms/signals';

@Service()
export class FormService {
  private readonly model = signal<Profile>({
    account: createAccountModel(),
  });

  readonly form = form(this.model, (p) => {
    accountSchema(p.account);
  });
}
