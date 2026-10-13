import { Component, inject } from '@angular/core';
import { FormRoot } from '@angular/forms/signals';
import { AccountFormService } from './account-form';
import { FormService } from './form-service';

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
