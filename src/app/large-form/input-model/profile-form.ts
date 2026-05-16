import { Component, signal } from '@angular/core';
import { createAccountModel, Profile } from '../form.model';
import { AccountFormInputModel } from './account-form';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-profile-form-input-model',
  imports: [AccountFormInputModel, JsonPipe],
  template: `
    <h2>Input Model</h2>
    <form>
      <app-account-form-input-model [(model)]="model().account.firstName" />
    </form>

    {{ model().account | json }}
  `,
})
export class ProfileFormInputModel {
  readonly model = signal<Profile>({
    account: createAccountModel(),
  });
}
