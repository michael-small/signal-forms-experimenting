import { Component, inject, signal } from '@angular/core';
import { form, FormRoot } from '@angular/forms/signals';
import { AccountFormService } from './account-form';
import { accountSchema, createAccountModel } from '../form.model';
import { FormService, Profile } from './form-service';

@Component({
  selector: 'app-profile-form-service',
  imports: [AccountFormService, FormRoot],
  template: `
    <form [formRoot]="formService.form">
      <app-account-form-service />
    </form>
  `,
})
export class ProfileFormService {
  readonly formService = inject(FormService);
}
